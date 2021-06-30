'use strict';


class Collection {
    constructor(model) {
        this.model = model;
    }


    create(obj) {
        let newItem = new this.model(obj);
        newItem.save();
        return newItem
    }



    get(id) {
        if (id) {
            return this.model.find({ _id: id });
        } else {
            return this.model.find({});
        }

    }


    update(id, obj) {
        let updated = this.model.findByIdAndUpdate(id, obj, { new: true });
        return updated
    }

    delete(id) {
        this.model.findByIdAndDelete({ _id: id });

        return null
    }
}

module.exports = Collection;