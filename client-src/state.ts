export const state = {
  // Set initial data
  data: {
    currentUser: {
      email: "",
      token: "",
    },
    loggedIn: false,
  },
  // Get user data form local storage if exists
  init() {
    if (window.localStorage.getItem("state")) {
      this.setState(JSON.parse(window.localStorage.getItem("state")));
    }
  },
  getState() {
    return this.data;
  },
  // Set state and save it into local storage
  setState(newState) {
    this.data = newState;
    window.localStorage.setItem("state", JSON.stringify(newState));
  },
  // Make HTTP request and return user balance
  async getBalance() {
    const currentState = this.getState();
    const balance = await fetch("/me/balance", {
      headers: {
        Authorization: "bearer " + currentState.currentUser.token,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return balance;
  },
  // Make HTTP request, check email and password and save the user info in state
  async logIn(email: string, password: string) {
    const currentState = this.getState();
    const res = await fetch("/auth/token", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      method: "POST",
    }).then((res) => res.json());
    if (res.authenticated) {
      currentState.currentUser.token = res.token;
      currentState.currentUser.email = email;
      currentState.loggedIn = true;
      this.setState(currentState);
      return true;
    } else {
      return false;
    }
  },
  // Delete user info from state
  logOut() {
    const currentState = this.getState();
    currentState.loggedIn = false;
    currentState.editRecordId = "";
    currentState.currentUser = {
      email: "",
      token: "",
    };
    this.setState(currentState);
  },
  // Make HTTP request and create a new user
  async signUp(email: string, password: string) {
    const res = await fetch("/auth", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      method: "POST",
    }).then((res) => res.json());
    if (res.auth) {
      return true;
    } else {
      return false;
    }
  },
  // Make HTTP request and return all records from user. Limit or filter search if needed.
  async getRecords(limit?: number, category?: string) {
    const currentState = this.getState();
    let fetchUrl = "/me/records";
    if (limit) {
      fetchUrl = "/me/records" + "?limit=" + limit;
    }
    if (category) {
      fetchUrl = "/me/records" + "?category=" + category;
    }
    if (category && limit) {
      fetchUrl = "/me/records" + "?limit=" + limit + "&category=" + category;
    }
    const records = await fetch(fetchUrl, {
      headers: {
        Authorization: "bearer " + currentState.currentUser.token,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return records;
  },
  // Make HTTP request and return record found by record ID
  async getRecordById(id: string) {
    const currentState = this.getState();
    const record = await fetch("/me/records/" + id, {
      headers: {
        Authorization: "bearer " + currentState.currentUser.token,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return record;
  },
  // Make HTTP request and update an existing record with data provideded
  async editRecord(recordId, recordData) {
    const currentState = this.getState();
    const edited = await fetch("/me/records/" + recordId, {
      method: "PATCH",
      headers: {
        Authorization: "bearer " + currentState.currentUser.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recordData),
    }).then((res) => res.json());
    return edited;
  },
  // Make HTTP request and delete record
  async deleteRecord(id: number) {
    const currentState = this.getState();
    const deleted = await fetch("/me/records/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "bearer " + currentState.currentUser.token,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return deleted;
  },
  // Make HTTP request and create a new record
  async newRecord(recordData: {
    date: string;
    concept: string;
    type: string;
    amount: number;
    category: string;
  }) {
    const currentState = this.getState();
    const created = await fetch("/me/records", {
      method: "POST",
      headers: {
        Authorization: "bearer " + currentState.currentUser.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recordData),
    }).then((res) => res.json());
    return created;
  },
};
