var pagination = require('mongoose-paginate-v2');

pagination.paginate.options = {
  lean: true,
  leanWithId: true
};