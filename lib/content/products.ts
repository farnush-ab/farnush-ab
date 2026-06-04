export type Product = {
  id: string;
  lot: string;
  nameFa: string;
  nameEn: string;
  tagFa: string;
  tagEn: string;
  imageSrc: string;
  imageAlt: string;
};

export const featuredProducts: Product[] = [
  {
    id: 'chrome-basin',
    lot: 'Lot 01',
    nameFa: 'شیر پایه‌بلند',
    nameEn: 'Basin Mixer',
    tagFa: 'کروم روی مشکی',
    tagEn: 'Chrome on Black',
    imageSrc: '/photography/product-01.jpeg',
    imageAlt: 'Chrome and black basin mixer',
  },
  {
    id: 'slim-tall',
    lot: 'Lot 02',
    nameFa: 'شیر بلندِ مرمری',
    nameEn: 'Tall Slim Tap',
    tagFa: 'کروم مات',
    tagEn: 'Brushed Chrome',
    imageSrc: '/photography/product-02.jpeg',
    imageAlt: 'Tall slim chrome tap against travertine',
  },
  {
    id: 'three-piece',
    lot: 'Lot 03',
    nameFa: 'مجموعه‌ی سه‌پارچه',
    nameEn: 'Three-piece Mixer',
    tagFa: 'برنزِ دودی',
    tagEn: 'Smoked Bronze',
    imageSrc: '/photography/product-03.jpeg',
    imageAlt: 'Smoked bronze three-piece mixer on concrete',
  },
];
