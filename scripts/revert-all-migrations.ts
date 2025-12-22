import { DataSource } from 'typeorm';
import { TyepOrmConfig } from '../src/Infraestructure/orm/typeorm/config/ormconfig';

async function revertAllMigrations() {
    const dataSource = new DataSource(TyepOrmConfig.getConfig());
    
    try {
        console.log('🔌 Connecting to database...');
        await dataSource.initialize();
        console.log('✅ Connected to database\n');

        // Get executed migrations
        const executedMigrations = await dataSource.query(
            `SELECT * FROM migrations ORDER BY timestamp DESC`
        );
        
        if (executedMigrations.length === 0) {
            console.log('ℹ️  No migrations to revert');
            await dataSource.destroy();
            process.exit(0);
        }

        console.log(`📋 Found ${executedMigrations.length} executed migration(s)\n`);

        let reverted = 0;

        // Revert all migrations one by one
        for (let i = 0; i < executedMigrations.length; i++) {
            try {
                await dataSource.undoLastMigration();
                reverted++;
                console.log(`✅ Reverted migration ${reverted}/${executedMigrations.length}`);
            } catch (error) {
                console.error(`❌ Error reverting migration: ${error.message}`);
                break;
            }
        }

        console.log(`\n🎉 Successfully reverted ${reverted} migration(s)`);
    } catch (error) {
        console.error('❌ Error reverting migrations:', error);
        process.exit(1);
    } finally {
        if (dataSource && dataSource.isInitialized) {
            await dataSource.destroy();
            console.log('🔌 Database connection closed');
        }
        process.exit(0);
    }
}

revertAllMigrations();
