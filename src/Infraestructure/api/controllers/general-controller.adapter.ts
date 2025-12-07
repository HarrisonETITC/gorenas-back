import { API_ALL, API_CREATE, API_DELETE, API_ID, API_MODIFY } from "@Application/api/endpoint-names";
import { GeneralControllerPort } from "@Application/ports/general-controller.port";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { JwtGuard } from "@Application/api/guards/jwt.guard";
import { GeneralModel } from "@Domain/models/general/general.model";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { MessageResponse } from "@Domain/types/message-response.type";
import { Body, Delete, Get, Post, Put, Query, Type, UseGuards } from "@nestjs/common";
import { SetTypedBody } from "@Application/core/decorators/set-type-body.decorator";
import { UserIdStringDto } from "@Domain/models/general/dto/user-id-string.dto";
import { SetTypedQuery } from "@Application/core/decorators/set-type-query.decorator";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";
import { RolesGuard } from "@Application/api/guards/rol.guard";
import { Roles } from "@Application/core/decorators/role.decorator";
import { RoleModel } from "@Domain/models/role.model";
import { DataResponse } from "@Domain/interfaces/data-response.interface";
import { ControllerAvailableCanSeePort } from "@Application/ports/controller-available-cansee.port";
import { ValuesSearchParams } from "@Application/core/params/search/values-search.params";
import { GetOriginalByIdPort } from "@Application/ports/get-original-byid.port";
import { AppUtil } from "@Application/core/utils/app.util";
import { ApiOperation, ApiResponse, ApiQuery, ApiBody } from "@nestjs/swagger";

export const GeneralControllerAdapter = <T extends GeneralModel, U = T, K = T, J = T>(domain: Type<T>, create: Type<U>, modify: Type<K>, modelView: Type<J>):
    Type<GeneralControllerPort<T, U, K, J> & ControllerAvailableCanSeePort<J>> => {

    @UseGuards(JwtGuard, RolesGuard)
    class GeneralControllerAdapter<T extends GeneralModel, U = T, K = T, J = T> implements GeneralControllerPort<T, U, K, J>, ControllerAvailableCanSeePort<J> {

        constructor(
            private readonly service: GeneralServicePort<T, U, K, J> & GenerateModelViewPort<T, J> & GetAvailableCanSeePort<J> & GetOriginalByIdPort<T>
        ) { }

        @Get(API_ALL)
        @ApiOperation({ summary: 'Get all records' })
        @ApiResponse({ status: 200, description: 'Returns all records' })
        async findAll(): Promise<DataResponse<Array<J>>> {
            return { data: (await this.service.generateModelView(await this.service.getAll())) };
        }

        @Get(API_ID)
        @ApiOperation({ summary: 'Get record by ID' })
        @ApiQuery({ name: 'id', required: true, type: String })
        @ApiQuery({ name: 'edition', required: false, type: String, description: 'Set to "true" to get original model without transformation' })
        @ApiResponse({ status: 200, description: 'Returns the record' })
        async findById(
            @Query('id') id: string,
            @Query('edition') isEdition?: string
        ): Promise<DataResponse<J>> {
            const finded = await this.service.getOriginalById(Number(id));

            if (!AppUtil.verifyEmpty(isEdition) && isEdition === 'true') return { data: (finded as any) };

            const findedMV = (await this.service.generateModelView([finded]))[0];
            return { data: findedMV };
        }

        @Post(API_CREATE)
        @ApiOperation({ summary: 'Create a new record' })
        @ApiBody({ type: create })
        @ApiResponse({ status: 201, description: 'Record created successfully' })
        @SetTypedBody(create)
        async create(@Body() data: U): Promise<DataResponse<J>> {
            const created = await this.service.create(data);
            return { data: (await this.service.generateModelView([created]))[0] };
        }

        @Put(API_MODIFY)
        @ApiOperation({ summary: 'Update an existing record' })
        @ApiBody({ type: modify })
        @ApiResponse({ status: 200, description: 'Record updated successfully' })
        @SetTypedBody(modify)
        async modify(@Body() data: K): Promise<DataResponse<J>> {
            const modified = await this.service.modify(data['id'], data);
            return { data: (await this.service.generateModelView([modified]))[0] };
        }

        @Delete(API_DELETE)
        @ApiOperation({ summary: 'Delete a record' })
        @ApiQuery({ name: 'id', required: true, type: String })
        @ApiResponse({ status: 200, description: 'Record deleted successfully' })
        @SetTypedQuery(UserIdStringDto)
        async delete(@Query('id') id: string): Promise<MessageResponse> {
            await this.service.delete(Number(id));
            return { message: 'Dato eliminado correctamente' };
        }

        @Get('available')
        @ApiOperation({ summary: 'Get available records for selection' })
        @ApiResponse({ status: 200, description: 'Returns available records as id-value pairs' })
        @Roles(RoleModel.BASE_ROLES)
        @SetTypedQuery(BasicSearchParams)
        async getAvailable(@Query() params: BasicSearchParams): Promise<DataResponse<Array<IdValue>>> {
            return { data: (await this.service.getAvailable(params)) };
        }

        @Get('can-see')
        @ApiOperation({ summary: 'Get records that user can see based on permissions' })
        @ApiResponse({ status: 200, description: 'Returns filtered records' })
        @SetTypedQuery(BasicSearchParams)
        async getCanSee(@Query() params: BasicSearchParams): Promise<DataResponse<Array<J>>> {
            return { data: (await this.service.getCanSee(params)) };
        }

        @Get('id-value')
        @ApiOperation({ summary: 'Get multiple records by IDs as id-value pairs' })
        @ApiResponse({ status: 200, description: 'Returns records as id-value pairs' })
        @SetTypedQuery(ValuesSearchParams)
        async getIdValueMany(@Query() params: ValuesSearchParams): Promise<DataResponse<Array<IdValue>>> {
            return { data: (await this.service.getIdValueMany(params.values)) };
        }
    }

    return GeneralControllerAdapter;
}
