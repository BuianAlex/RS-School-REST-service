import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Board } from './entities/board.entity';
import { ColumnEnt } from '../columns/entities/column.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(ColumnEnt)
    private columnRepository: Repository<ColumnEnt>
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const { columns, ...restParams } = createBoardDto;
    const newBoard = this.boardsRepository.create(restParams);
    const saveBoardResult = await this.boardsRepository.save(newBoard);
    const arrColumns = columns.map((item) => {
      item.boardId = saveBoardResult;
      return this.columnRepository.create(item);
    });
    const saveColumnsResult = await this.columnRepository.save(arrColumns);
    saveBoardResult.columns = saveColumnsResult;
    return Board.toResponse(saveBoardResult);
  }

  async findAll() {
    const findResult = await this.boardsRepository.find({
      relations: ['columns'],
    });
    return findResult.map(Board.toResponse);
  }

  async findOne(id: string) {
    const findResult = await this.boardsRepository.findOne(id, {
      relations: ['columns'],
    });
    if (!findResult) return undefined;
    return Board.toResponse(findResult);
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const { columns, ...restProps } = updateBoardDto;
    const oldBoard = await this.boardsRepository.findOne(id, {
      relations: ['columns'],
    });
    if (!oldBoard) return undefined;
    const updateBoardResult = await this.boardsRepository.save({
      ...oldBoard,
      ...restProps,
    });
    interface IFilteredColumns {
      forCreate: ColumnEnt[];
      forUpdate: ColumnEnt[];
      forDelete: ColumnEnt[];
    }

    const filterColumns: IFilteredColumns = {
      forCreate: [],
      forUpdate: [],
      forDelete: [],
    };
    columns?.forEach((item) => {
      item.boardId = updateBoardResult;
      if (item.id) {
        filterColumns.forUpdate.push(item);
      } else {
        filterColumns.forCreate.push(item);
      }
    });
    oldBoard.columns.forEach((oldListItem) => {
      const index = columns?.findIndex(
        (newListItem) => newListItem.id === oldListItem.id
      );
      if (index && index < 0) {
        filterColumns.forDelete.push(oldListItem);
      }
    });
    if (filterColumns.forCreate.length) {
      const arrNewColumns = filterColumns.forCreate.map((item) => {
        return this.columnRepository.create(item);
      });
      await this.columnRepository.save(arrNewColumns);
    }
    if (filterColumns.forDelete.length) {
      await this.columnRepository.remove(filterColumns.forDelete);
    }
    if (filterColumns.forUpdate.length) {
      const idForUpdate = filterColumns.forUpdate.map((item) => ({
        id: item.id,
      }));
      const columnListToUpdate = await this.columnRepository.find({
        where: idForUpdate,
      });

      const updatedList = columnListToUpdate.map((item) => {
        const newProps = filterColumns.forUpdate.find(
          (props) => item.id === props.id
        );
        return {
          ...item,
          ...newProps,
        };
      });
      await this.columnRepository.save(updatedList);
    }

    const updatedBoard = await this.boardsRepository.findOne(id, {
      relations: ['columns'],
    });
    if (!updatedBoard) return undefined;
    return Board.toResponse(updatedBoard);
  }

  remove(id: string) {
    return this.boardsRepository.delete(id);
  }
}
