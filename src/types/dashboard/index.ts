/*Recent Transaction*/
type recentTrans = {
    title: string;
    subtitle: string;
    textcolor: string;
    boldtext: boolean;
    line: boolean;
    link: string;
    url: string;
};

/*product performance*/
type productPerformanceType = {
    id: number;
    name: string;
    post: string;
    pname: string;
    status: string;
    statuscolor: string;
    budget: string;
};

/*Products card types*/
type productsCards = {
    key: string;
    title: string;
    link: string;
    photo: string;
    salesPrice: number;
    price: number;
    rating: number;
};

type newsType = {
    key: string;
    title: string;
    content: string;
    summary: string;
    img: Object;
}

export type { recentTrans, productPerformanceType, productsCards }