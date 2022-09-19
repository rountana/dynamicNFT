function App() {
  const thingsArray = ["Thing 1", "Thing 2"];
  const thingsElements = thingsArray.map((thing) => <p key={thing}>{thing}</p>);

  function addThings() {
    // thingsArray.push("Thing " + (thingsArray.length + 1));
    // ES6 version of above code
    thingsArray.push(`Thing ${thingsArray.length + 1}`);
    console.log(thingsArray);
  }

  return (
    <div>
      <button onClick={addThings}>Add Item</button>
      {thingsElements}
    </div>
  );
}
