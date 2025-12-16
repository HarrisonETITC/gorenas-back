import { Provider } from "@nestjs/common";
import { STATS_REPOSITORY, STATS_SERVICE } from "@Application/config/inject-tokens/stats.tokens";
import { StatsRepository } from "../../repositories/stats.repository";
import { StatsServiceAdapter } from "@Application/adapters/stats-service.adapter";

export const StatsProviders: Array<Provider> = [
    {
        provide: STATS_REPOSITORY,
        useClass: StatsRepository
    },
    {
        provide: STATS_SERVICE,
        useClass: StatsServiceAdapter
    }
];
