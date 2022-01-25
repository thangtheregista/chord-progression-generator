import "./App.scss";
import { Stack, Button, Accordion } from "react-bootstrap";
import { useState, useEffect } from "react";
function App() {
  const [key, setKey] = useState([]);
  const [scale, setScale] = useState([]);
  const [chordPro, setChordPro] = useState([]);
  const [progression, setProgression] = useState([]);
  const keys = [
    "A",
    "Bb/A#",
    "B",
    "C",
    "Db/C#",
    "D",
    "Eb/D#",
    "E",
    "F",
    "Gb/F#",
    "G",
    "Ab/G#",
  ];
  const progressions = [
    [1, 5],
    [1, 4],
    [1, 4, 5],
  ];
  const findScale = (text) => {
    // setKey(text);
    var pos = 0;
    const array = keys;
    array.push(...keys);
    const newArr = [];
    var indext = array.indexOf(text);
    for (let i = 0; i < 5; i += 2) {
      newArr.push(array[indext + i]);
      pos = i + 1;
    }
    indext = array.indexOf(array[indext + pos]);
    for (let i = 0; i < 7; i += 2) {
      newArr.push(array[indext + i]);
      pos = i + 1;
    }
    newArr.push(array[indext + pos]);
    setScale(newArr);
  };
  const findChord = (progression) => {
    const chords = [];
    progression.map((num) => {
      chords.push(scale[num - 1]);
    });
    setChordPro(chords);
  };
  useEffect(() => {
    console.log(key);
    console.log(scale);
    console.log(progression);

    if (key.length !== 0) {
      if (
        !document
          .getElementsByClassName("accordion-collapse collapse")[1]
          .classList.contains("show")
      ) {
        document.getElementsByClassName("accordion-button")[1].click();
      }
    }
  }, [key, scale, progression, chordPro]);
  return (
    <div className="App">
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            <Stack gap={3}>
              <div className="bg-light border">
                <Stack direction="horizontal" gap={3}>
                  {keys.map((key) => (
                    <div className="bg-primary border" key={key}>
                      {" "}
                      <Button
                        onClick={(e) => {
                          findScale(e.target.value);
                          setKey(e.target.value);
                          document
                            .getElementsByClassName("accordion-button")[0]
                            .click();
                        }}
                        variant="primary"
                        value={key.toString()}
                      >
                        {key.toString()}
                      </Button>
                    </div>
                  ))}
                </Stack>
              </div>
            </Stack>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            <Stack gap={3}>
              <div className="bg-light border">
                <Stack direction="horizontal" gap={3}>
                  {progressions.map((progression) => (
                    <div
                      className="bg-primary border"
                      key={progression.toString()}
                    >
                      {" "}
                      <Button
                        onClick={(e) => {
                          setProgression(progression);
                          findChord(progression);
                          document
                            .getElementsByClassName("accordion-button")[1]
                            .click();
                        }}
                        variant="primary"
                        value={progression}
                      >
                        {progression.toString()}
                      </Button>
                    </div>
                  ))}
                </Stack>
              </div>
            </Stack>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {chordPro.length > 0 ? <div>{chordPro}</div> : <div>empty</div>}
    </div>
  );
}

export default App;
