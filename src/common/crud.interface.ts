export interface IMandatoryCrud<T, S> {
    add: (resource: T) => Promise<any>;
    getOne: (field: S , hiddenFields ?: any) => Promise<any>;
}

export interface IOptionalCrud<S, D> {
    getAll: (limit: number, page: number, filter?: any) => Promise<any>;
    delete: (field: S) => Promise<any>;
    update: (field: S, data: D) => Promise<any>;
}
