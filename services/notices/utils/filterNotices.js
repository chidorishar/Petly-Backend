async function filterNotices(notices, filterObj, { skip, limit }) {
  return await notices
    .find(filterObj)
    .skip(skip)
    .limit(limit)
    .sort({ updatedAt: -1 });
}

module.exports = {
  filterNotices,
};
