import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoDocente } from './entities/nodocente.entity';
import { CreateNodocenteDto } from './dto/create-nodocente.dto';
import { UpdateNodocenteDto } from './dto/update-nodocente.dto';
import { LoginNodocenteDto } from './dto/LoginNodocenteDto';

@Injectable()
export class NodocenteService {
  constructor(
    @InjectRepository(NoDocente)
    private readonly nodocenteRepository: Repository<NoDocente>,
  ) {}

  create(createNodocenteDto: CreateNodocenteDto) {
    const nodocente = this.nodocenteRepository.create(createNodocenteDto);
    return this.nodocenteRepository.save(nodocente);
  }

  findAll() {
    return this.nodocenteRepository.find();
  }

  findOne(id: number) {
    return this.nodocenteRepository.findOne({ where: { id } });
  }

  update(id: number, updateNodocenteDto: UpdateNodocenteDto) {
    return this.nodocenteRepository.update(id, updateNodocenteDto);
  }

  remove(id: number) {
    return this.nodocenteRepository.delete(id);
  }

  async register(createNodocenteDto: CreateNodocenteDto) {
    const nodocente = this.nodocenteRepository.create(createNodocenteDto);
    return this.nodocenteRepository.save(nodocente);
  }

  async login(loginNodocenteDto: LoginNodocenteDto) {
    const nodocente = await this.nodocenteRepository.findOne({ where: { correo: loginNodocenteDto.correo } });
    if (!nodocente || nodocente.contrasena !== loginNodocenteDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return nodocente;
  }
}