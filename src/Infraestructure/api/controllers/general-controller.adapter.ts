import { API_ALL, API_CREATE, API_DELETE, API_ID, API_MODIFY } from "@Application/api/endpoint-names";
import { GeneralControllerPort } from "@Application/ports/general-controller.port";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { JwtGuard } from "@Application/api/guards/jwt.guard";
import { GeneralModel } from "@Domain/models/general/general.model";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { MessageResponse } from "@Domain/types/message-response.type";
import { Body, Delete, Get, Post, Put, Query, Type, UseGuards } from "@nestjs/common";
import { SetTypedBody } from "@Application/core/decorators/set-type-body.decorator";
import { IdStringDto } from "@Domain/models/general/dto/id-string.dto";
import { SetTypedQuery } from "@Application/core/decorators/set-type-query.decorator";
import { GetAvailableCanSeePort } from "@Application/ports/cansee-available.port";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";

export const GeneralControllerAdapter = <T extends GeneralModel, U = T, K = T, J = T>(domain: Type<T>, create: Type<U>, modify: Type<K>, modelView: Type<J>):
    Type<GeneralControllerPort<T, U, K, J>> => {

    @UseGuards(JwtGuard)
    class GeneralControllerAdapter<T extends GeneralModel, U = T, K = T, J = T> implements GeneralControllerPort<T, U, K, J>, GetAvailableCanSeePort<J> {

        constructor(
            private readonly service: GeneralServicePort<T, U, K> & GenerateModelViewPort<T, J> & GetAvailableCanSeePort<J>
        ) { }

        @Get(API_ALL)
        async findAll(): Promise<J[]> {
            return await this.service.generateModelView(await this.service.getAll());
        }

        @Get(API_ID)
        @SetTypedQuery(IdStringDto)
        async findById(
            @Query('id') id: string
        ): Promise<J> {
            const finded = await this.service.getById(Number(id));
            return (await this.service.generateModelView([finded]))[0];
        }

        @Post(API_CREATE)
        @SetTypedBody(create)
        async create(@Body() data: U): Promise<J> {
            const created = await this.service.create(data);
            return (await this.service.generateModelView([created]))[0];
        }

        @Put(API_MODIFY)
        @SetTypedBody(modify)
        async modify(@Body() data: K): Promise<J> {
            const modified = await this.service.modify(data['id'], data);
            return (await this.service.generateModelView([modified]))[0];
        }

        @Delete(API_DELETE)
        @SetTypedQuery(IdStringDto)
        async delete(@Query('id') id: string): Promise<MessageResponse> {
            await this.service.delete(Number(id));
            return { message: 'Dato eliminado correctamente' };
        }

        @Get('available')
        @SetTypedQuery(BasicSearchParams)
        async getAvailable(@Query() params: BasicSearchParams): Promise<Array<IdValue>> {
            return (await this.service.getAvailable(params))
        }

        @Get('can-see')
        @SetTypedQuery(BasicSearchParams)
        async getCanSee(@Query() params: BasicSearchParams): Promise<Array<J>> {
            return (await this.service.getCanSee(params));
        }
    }

    return GeneralControllerAdapter;
}
