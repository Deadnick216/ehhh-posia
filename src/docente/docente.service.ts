import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Docente } from './entities/docente.entity';
import { LoginDocenteDto } from './dto/login-docente.dto';

@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
  ) {}

  create(createDocenteDto: CreateDocenteDto) {
    const docente = this.docenteRepository.create(createDocenteDto);
    return this.docenteRepository.save(docente);
  }

  findAll() {
    return this.docenteRepository.find();
  }

  findOne(id: number) {
    return this.docenteRepository.findOne({ where: { id } });
  }

  update(id: number, updateDocenteDto: UpdateDocenteDto) {
    return this.docenteRepository.update(id, updateDocenteDto);
  }

  remove(id: number) {
    return this.docenteRepository.delete(id);
  }

  async register(createDocenteDto: CreateDocenteDto) {
    const docente = this.docenteRepository.create(createDocenteDto);
    return this.docenteRepository.save(docente);
  }

  async login(loginDocenteDto: LoginDocenteDto) {
    const docente = await this.docenteRepository.findOne({ where: { correo: loginDocenteDto.correo } });
    if (!docente || docente.contrasena !== loginDocenteDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return docente;
  }
}