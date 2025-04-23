import axios from 'axios';

const SharePointURL = 'http://localhost:3004';

export const getList = async (listName, filter = '') => {
  try {
    // console.log(`getting ${listName} list with filter ${filter}`);
    
    const response = await axios.get(`${SharePointURL}/_api/web/lists/getbytitle('${listName}')/items${filter}`, {
      headers: {
          'Accept': 'application/json; odata=verbose',
          'Content-Type': 'application/json; charset=utf-8',
          //'Authorization': 'Bearer ' + yourAccessToken // Include your access token if required
      }
  });
    
    return response;
  } catch (error) {
    console.error(`Error getting ${listName} items:`, error);
  }
}

export const addNewItem = async (listName, item) => {
  try {
    const response = await axios.post(
      `${SharePointURL}/_api/web/lists/getbytitle('${listName}')/items`,
      item,
      {
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose',
          //'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Error creating item:', error);
  }
};

export const modifyItem = async (listName, item) => {
  try {
    const response = await axios.post(
      `${SharePointURL}/_api/web/lists/getbytitle('${listName}')/items(${item.id})`,
      item,
      {
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose',
          // 'IF-MATCH': '*',
          //'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Error creating item:', error);
  }
}

export const deleteItem = async (listName, itemId) => {
  console.log("deleting item with id:", itemId)
  try {
    const response = await axios.delete(
      `${SharePointURL}/_api/web/lists/getbytitle('${listName}')/items(${itemId})`,
      {
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose',
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}