class APIFilters {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr
    }
    search() {
        const keyword = this.queryStr.keyword
        ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filters() {
        const queryCopy = {...this.queryStr};
        // console.log(queryCopy);
        //fields to remove
        const fieldsToRemove = ["keyword","page"];
        fieldsToRemove.forEach((el) => delete queryCopy[el])
        //Advanced filter for price,rating etc.
        //need to add $ sign before gte as mongoDb operator work as it and need to convert string into number for price....
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr))
        console.log(queryStr);
        console.log(queryCopy);
        return this;
    }
    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query =  this.query.limit(resPerPage).skip(skip)
        return this;

    }
}
export default APIFilters