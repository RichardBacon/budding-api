exports.formatDates = (list) => {
  const formattedList = list.map((listItem) => {
    return {
      ...listItem,
      created_at: new Date(listItem.created_at),
    };
  });

  return formattedList;
};
