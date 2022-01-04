import { Record } from "../models/models";

// Record data type
export type RecordType = {
  concept: string;
  amount: number;
  date: string;
  type: string;
  category: string;
  UserId: string;
};

// Create new record
export async function newRecord(recordData: RecordType) {
  return await Record.create(recordData);
}

// Get records from user. If "limit" is provided limit the search. If "category" is provided filter the search
export async function getAllRecordsByUserId(
  userId: string,
  limit?: number,
  category?: string
) {
  if (category) {
    return await Record.findAll({
      where: { UserId: userId, category },
      order: [["date", "DESC"]],
      limit: limit,
    });
  } else {
    return await Record.findAll({
      where: { UserId: userId },
      order: [["date", "DESC"]],
      limit: limit,
    });
  }
}

// Return one record found by record id
export async function getRecordById(UserId: string, recordId: string) {
  return await Record.findOne({
    where: { UserId, id: recordId },
  });
}

// Record type for updating
export type UpdateRecordType = {
  concept?: string;
  amount?: number;
  date?: string;
  category?: string;
};

// Update record with given data
export async function updateRecordById(
  recordData: UpdateRecordType,
  recordId: string,
  UserId: string
) {
  return await Record.update(recordData, {
    where: {
      id: recordId,
      UserId: UserId,
    },
  });
}

// Find the sum of all record amounts form user ID. Return final balance
export async function getBalance(UserId) {
  const income = await Record.sum("amount", {
    where: {
      UserId,
      type: "income",
    },
  });
  const expenses = await Record.sum("amount", {
    where: {
      UserId,
      type: "expense",
    },
  });

  return income - expenses;
}

// Delete one record
export async function deleteRecordById(recordId: number) {
  return await Record.destroy({
    where: {
      id: recordId,
    },
  });
}
