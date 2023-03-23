const MAX_PER_PAGE = 20;

function parsePagination(page = 1, limit = MAX_PER_PAGE) {
  const parsedLimit =
    parseInt(limit) > MAX_PER_PAGE ? MAX_PER_PAGE : parseInt(limit);
  const parsedSkip = (parseInt(page) - 1) * limit;

  return { limit: parsedLimit, skip: parsedSkip };
}

module.exports = {
  parsePagination,
};
