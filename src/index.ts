export type Product = {
    name: string,
    vendor: string,
    category: string,
    bagel?: boolean,
};
const categories = [
    { category: 'one', vendor: 'shop1' },
    { category: 'two', vendor: 'shop1' },
    { category: 'three', vendor: 'shop2' },
];

const config = {
    market: {
        shop1: {
            bagel: true,
        },
        shop2: {
            bagel: false,
        }
    }
};

const products: Product[] = [
    {
        name: 'A',
        vendor: 'shop1',
        category: 'one',
        bagel: true,
    },
    {
        name: 'B',
        vendor: 'shop1',
        category: 'two',
    },
];


function request (product: { vendor: string }, vendor: string) {
    return Promise.resolve({ ...product, available: product.vendor === vendor });
}


async function showProduct (type: string) {
    for (const { category, vendor } of categories) {

        if (!config.market?.[vendor]?.[type]) {
            continue;
        }

        const possibleProducts = products.filter((p: Product) => p[type] && p.category === category)

        for (const product of possibleProducts) {
            const updated = await request(product, vendor);
            if (updated.available) {
                console.log(product);
                return;
            }
        }
    }
}

showProduct('bagel');


// The code works when:
// no async await - request returns an object, not a promise (l.40, l.54)
// for..in loop instead of for..of (53)
// products are not filtered (l.51)
// no optional chaining in if condition (l.47)