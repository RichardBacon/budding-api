const { formatDates } = require('../db/utils/utils');

describe('formatDates', () => {
  test('returns a new array', () => {
    const inputList = [];
    const actual = formatDates(inputList);

    expect(Array.isArray(actual)).toBe(true);
    expect(actual).not.toBe(inputList);
  });

  test('returns an array of objects, when passed an array of objects', () => {
    const inputList = [
      {
        plant_name: 'plantName1',
        owner_id: 1,
        type: 'plantType1',
        soil: 'soil1',
        directSunlight: true,
        inside: false,
        wateringFreq: 2,
        created_at: 1416140514171,
      },
    ];
    const actual = formatDates(inputList);

    expect(actual.length).toBe(1);
    expect(typeof actual[0]).toBe('object');
  });

  test('returned objects have created_by value converted into Date object - one object in array', () => {
    const inputList = [
      {
        plant_name: 'plantName1',
        owner_id: 1,
        type: 'plantType1',
        soil: 'soil1',
        directSunlight: true,
        inside: false,
        wateringFreq: 2,
        created_at: 1416140514171,
      },
    ];
    const returnedList = formatDates(inputList);

    expect(returnedList[0].created_at).toBeInstanceOf(Date);
  });

  test('returned objects have created_by value converted into Date object - multiple objects in array', () => {
    const inputList = [
      {
        plant_name: 'plantName1',
        owner_id: 1,
        type: 'plantType1',
        soil: 'soil1',
        directSunlight: true,
        inside: false,
        wateringFreq: 2,
        created_at: 1416140514171,
      },
      {
        plant_name: 'plantName2',
        owner_id: 2,
        type: 'plantType2',
        soil: 'soil2',
        directSunlight: true,
        inside: false,
        wateringFreq: 2,
        created_at: 1542284514171,
      },
      {
        plant_name: 'plantName3',
        owner_id: 3,
        type: 'plantType3',
        soil: 'soil3',
        directSunlight: true,
        inside: false,
        wateringFreq: 2,
        created_at: 1542284514172,
      },
    ];
    const returnedList = formatDates(inputList);

    returnedList.forEach((returnedListItem) => {
      expect(returnedListItem.created_at).toBeInstanceOf(Date);
    });
  });

  test('passed array is not mutated', () => {
    const inputList = [
      {
        plant_name: 'plantName1',
        owner_id: 1,
        type: 'plantType1',
        soil: 'soil1',
        directSunlight: true,
        inside: false,
        wateringFreq: 2,
        created_at: 1416140514171,
      },
    ];
    formatDates(inputList);

    expect(inputList).toEqual([
      {
        plant_name: 'plantName1',
        owner_id: 1,
        type: 'plantType1',
        soil: 'soil1',
        directSunlight: true,
        inside: false,
        wateringFreq: 2,
        created_at: 1416140514171,
      },
    ]);
  });

  test('returned objects are new objects', () => {
    const inputList = [
      {
        plant_name: 'plantName1',
        owner_id: 1,
        type: 'plantType1',
        soil: 'soil1',
        directSunlight: true,
        inside: false,
        wateringFreq: 2,
        created_at: 1416140514171,
      },
    ];
    const returnedList = formatDates(inputList);

    expect(returnedList[0]).not.toBe(inputList[0]);
  });

  test('returned objects keys and values persist (except created_at)', () => {
    const inputList = [
      {
        plant_name: 'plantName1',
        owner_id: 1,
        type: 'plantType1',
        soil: 'soil1',
        directSunlight: true,
        inside: false,
        wateringFreq: 2,
        created_at: 1416140514171,
      },
    ];
    const returnedList = formatDates(inputList);

    expect(returnedList[0]).toContainEntries([
      ['plant_name', 'plantName1'],
      ['owner_id', 1],
      ['type', 'plantType1'],
      ['soil', 'soil1'],
      ['directSunlight', true],
      ['inside', false],
      ['wateringFreq', 2],
    ]);
  });
});
