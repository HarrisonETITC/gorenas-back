import { API_ALL, API_CREATE, API_DELETE, API_ID, API_MODIFY } from "@Application/api/endpoint-names";
import { GeneralControllerPort } from "@Application/ports/general-controller.port";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { JwtGuard } from "@complements/guards/jwt.guard";
import { GeneralModel } from "@Domain/models/general/general.model";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { MessageResponse } from "@Domain/types/message-response.type";
import { Body, Delete, Get, Post, Put, Query, UseGuards } from "@nestjs/common";


export class GeneralControllerAdapter<T extends GeneralModel, U = T, K = T, J = T> implements GeneralControllerPort<T, U, K, J> {

    constructor(
        private readonly service: GeneralServicePort<T, U, K> & GenerateModelViewPort<T, J>
    ) { }

    @Get(API_ALL)
    async findAll(): Promise<J[]> {
        return await this.service.generateModelView(await this.service.getAll());
    }

    @Get(API_ID)
    async findById(
        @Query('id') id: string
    ): Promise<J> {
        const finded = await this.service.getById(parseInt(id));
        return (await this.service.generateModelView([finded]))[0];
    }

    @Post(API_CREATE)
    async create(@Body() data: U): Promise<J> {
        const created = await this.service.create(data);
        return (await this.service.generateModelView([created]))[0];
    }

    @Put(API_MODIFY)
    async modify(@Body() data: K): Promise<J> {
        const modified = await this.service.modify(data['id'], data);
        return (await this.service.generateModelView([modified]))[0];
    }

    @Delete(API_DELETE)
    async delete(@Query('id') id: string): Promise<MessageResponse> {
        await this.service.delete(parseInt(id));
        return { message: 'Dato eliminado correctamente' };
    }
}