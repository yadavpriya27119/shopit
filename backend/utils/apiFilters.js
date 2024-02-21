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
        const fieldsToRemove = ['keyword'];
        fieldsToRemove.forEach((el) => delete queryCopy[el])
        //Advanced filter for price,rating etc.
        //need to add $ sign before gte as mongoDb operator work as it and need to convert string into number for price....
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr))
        console.log(queryCopy);
        console.log(queryCopy);
        return this;
    }
}
export default APIFilters