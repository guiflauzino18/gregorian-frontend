export interface Pageable<T>{
    content: T[]
    last: boolean,
    totalPages: number,
    totalElements: number,
    first: true,
    size: number,
    numberOfElements: number,
    empty: boolean,
    sort: {sorted: boolean, empty: boolean, unsorted: boolean},
}

/*
{
    ],
    "pageable": "INSTANCE",
    "last": true,
    "totalPages": 1,
    "totalElements": 3,
    "first": true,
    "size": 3,
    "number": 0,
    "sort": {
        "sorted": false,
        "empty": true,
        "unsorted": true
    },
    "numberOfElements": 3,
    "empty": false
}
*/