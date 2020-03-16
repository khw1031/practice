const result = {
  async render() {
    const res = await axios.get("/api/users");
    const users = await res.data;
    return (users || [])
      .map(user => {
        return `<div>${user.id}: ${user.name}</div>`;
      })
      .join("_");
  },
};

export default result;
