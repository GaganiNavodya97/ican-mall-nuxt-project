import slugify from "slugify";

export const slugifyUrl = (title,id) => {
    const baseUrl = title + "-" + id;
    return slugify(baseUrl, {
        replacement: "-",
        lower: true,
        remove: /[*+~.)('"!:@/]/g
    });
}

export const  unslugifyUrl = (slug) => {
    const parts = slug.split('-');
    const id = parts.pop();
    const title = parts.join(' ');
    return { title, id: Number(id) };
}


export const getIdFromUrl = (url) => {
    const titles = url?.split("-");
    const id = titles && titles.length > 0 ? titles[titles.length - 1] : null;
    return id;
}
