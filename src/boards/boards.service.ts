import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Board, IBoardToResponse } from './entities/board.entity';
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

  async create(createBoardDto: CreateBoardDto): Promise<IBoardToResponse> {
    const { columns, ...restParams } = createBoardDto;
    const newBoard = this.boardsRepository.create(restParams);
    const saveBoardResult = await this.boardsRepository.save(newBoard);
    const arrColumns = columns.map((item) => {
      const { ...board } = item;
      board.boardId = saveBoardResult;
      return this.columnRepository.create(board);
    });
    const saveColumnsResult = await this.columnRepository.save(arrColumns);
    saveBoardResult.columns = saveColumnsResult;
    return Board.toResponse(saveBoardResult);
  }

  async findAll(): Promise<IBoardToResponse[]> {
    const findResult = await this.boardsRepository.find({
      relations: ['columns'],
    });
    return findResult.map(Board.toResponse);
  }

  async findOne(id: string): Promise<IBoardToResponse | undefined> {
    const findResult = await this.boardsRepository.findOne(id, {
      relations: ['columns'],
    });
    if (!findResult) return undefined;
    return Board.toResponse(findResult);
  }

  async update(
    id: string,
    updateBoardDto: UpdateBoardDto
  ): Promise<IBoardToResponse | undefined> {
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
      const { ...board } = item;
      board.boardId = updateBoardResult;
      if (item.id) {
        filterColumns.forUpdate.push(board);
      } else {
        filterColumns.forCreate.push(board);
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
      const arrNewColumns = filterColumns.forCreate.map((item) =>
        this.columnRepository.create(item)
      );
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

  async remove(id: string): Promise<boolean | undefined> {
    const deleteBoardResult = await this.boardsRepository.delete(id);
    const { affected } = deleteBoardResult;
    if (!affected) return undefined;
    return true;
  }
}
