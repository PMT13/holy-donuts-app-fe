
export interface IProduct {
  id: number,
  name: string,
  imgUrl: string,
  description: string,
  price: number,
  sale: number,
  category: IProductCategory[],
  discontinued: boolean
  discount: number


}

export interface IProductNew {
  name: string,
  imgUrl: string,
  description: string,
  price: number,
  sale: number,
  category: IProductCategory[],
  discontinued: boolean,
  discount: number
}

export interface IProductCategory {
  id: number,
  category: string

}

export interface IProductCategoryNew {
  category: string

}
