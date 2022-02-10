export class DBConnection {

  public constructor(
    private readonly host: string,
    private readonly user: string,
    private readonly pass: string,
    private readonly dbName: string
  ) {
    this.openConnection();
  }

  public async execute(someData: any): Promise<any> {
    // тут создается кастомной транзакции или что-либо угодно
  };

  public async save(someEntity: any): Promise<any> {
    // тут создается транзакция или что-либо угодно для сохранения сущности
  };

  public closeConnection() {
    // тут закрывается connection к источнику данных для выполнения запроса
  }

  private openConnection() {
    // тут открывается connection к источнику данных для выполнения запроса
  }
}
