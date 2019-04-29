'use strict';
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore();
const kind = 'Customer';

async function getCustomers()
{
  var objs = [];
  const query = datastore.createQuery('Customer').order('Created');
  const [customers] = await datastore.runQuery(query);
  customers.forEach(customer => {
    objs.push({Customer: customer[datastore.KEY], Description: customer.Description, Name: customer.Name, Created: customer.Created })
  });
  return objs;
}

async function getCustomer(id)
{
  var objs = [];
  const key = datastore.key([kind, datastore.int(id)]);
  const [customer] = await datastore.get(key);
  if(!customer){return objs;}
  objs.push({Customer: customer[datastore.KEY], Description: customer.Description, Name: customer.Name, Created: customer.Created });
  return objs;
}

module.exports.getCustomers = getCustomers;
module.exports.getCustomer = getCustomer;
