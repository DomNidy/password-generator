"use client";
import { RiFileCopyLine } from "react-icons/ri";
import { BaseSyntheticEvent, useEffect, useState } from "react";

type PasswordOptionBtnProps = {
  labelText: string;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordOptionBtn: React.FC<PasswordOptionBtnProps> = ({
  labelText,
  state,
  setState,
}) => {
  return (
    <div className="flex items-center ">
      <button
        className={`mr-2 h-5  w-5 border-2 border-white ${
          state ? "bg-white" : "bg-none"
        }`}
        onClick={() => setState(!state)}
      ></button>{" "}
      <h1 className="pointer-events-none">{labelText}</h1>
    </div>
  );
};

type PasswordLengthDragbarProps = {
  setPasswordLengthState: React.Dispatch<React.SetStateAction<number>>;
};
const PasswordLengthDragbar: React.FC<PasswordLengthDragbarProps> = ({
  setPasswordLengthState,
}) => {
  const [value, setValue] = useState<number>(12);

  const handleChange = (event: BaseSyntheticEvent) => {
    setValue(event.target.value);
    setPasswordLengthState(event.target.value);
  };

  return (
    <>
      <h1>Password Length: {value}</h1>
      <input
        type="range"
        min={6}
        max={32}
        value={value}
        style={{
          height: "8px",
          width: "100%",
          borderRadius: "0.5rem",
          backgroundColor: "#f3f3f3",
          boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.3)",
          outline: "none",
          appearance: "none",
          transition: "background-color 0.3s ease-in-out",
        }}
        onChange={handleChange}
      ></input>
    </>
  );
};

export default function Page() {
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [noOptionsSelected, setNoOptionsSelected] = useState<boolean>(false);
  const [isCopyPressed, setIsCopyPressed] = useState(false);
  const [generatedPassword, setGeneratedPassword] =
    useState<string>("P4$5W0rD!");

  // Whenever password options change, ensure noOptionsSelected state adjusts accordingly
  useEffect(() => {
    setNoOptionsSelected(
      !includeLowercase &&
        !includeNumbers &&
        !includeSymbols &&
        !includeUppercase
    );
  }, [includeLowercase, includeNumbers, includeSymbols, includeUppercase]);

  function generatePassword(): void {
    if (!noOptionsSelected) {
      const availableCharacters = createCharacterStringFromOptions();
      let pass = "";

      for (let i = 0; i < passwordLength; i++) {
        pass += availableCharacters.at(
          Math.floor(Math.random() * availableCharacters.length)
        );
      }
      setGeneratedPassword(pass);
    }
  }

  function createCharacterStringFromOptions(): string {
    let characterString = "";

    if (includeUppercase) {
      characterString += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (includeLowercase) {
      characterString += "abcdefghijklmnopqrstuvwxyz";
    }

    if (includeNumbers) {
      characterString += "0123456789";
    }

    if (includeSymbols) {
      characterString += "!@#$%^&*";
    }

    return characterString;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPassword);
    setIsCopyPressed(true);
    setTimeout(() => {
      setIsCopyPressed(false);
    }, 111);
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center bg-grayish-gradient">
      <h1 className="mt-12 pb-6 font-mono text-3xl font-semibold text-gray-400 sm:mt-12 md:mt-32 lg:mt-36">
        Password Generator
      </h1>
      <div className="flex h-full w-5/6 flex-col gap-8 sm:w-auto md:w-[39rem] lg:w-[45rem]">
        <div
          className="flex  h-24 w-full items-center justify-between rounded-sm bg-white bg-opacity-10 p-4 font-mono 
        text-4xl font-semibold tracking-wide text-white text-opacity-40 "
        >
          <input
            placeholder={generatedPassword}
            className={`h-full w-5/6 text-ellipsis bg-white bg-opacity-0 outline-none ${
              isCopyPressed
                ? "transition duration-100 placeholder:text-white placeholder:text-opacity-90"
                : "bg-opacity-0 transition duration-200"
            }`}
            disabled
          ></input>
          <div
            className="cursor-pointer text-green-300 checked:text-red-500 aria-pressed:text-red-500"
            onClick={handleCopy}
          >
            <RiFileCopyLine></RiFileCopyLine>
          </div>
        </div>

        <div
          className="flex h-auto w-full flex-col items-start gap-3 rounded-sm bg-white bg-opacity-10 
        p-4 font-mono text-xl font-semibold text-white text-opacity-70"
        >
          <PasswordLengthDragbar setPasswordLengthState={setPasswordLength} />
          <PasswordOptionBtn
            labelText={"Include Uppercase"}
            state={includeUppercase}
            setState={setIncludeUppercase}
          />
          <PasswordOptionBtn
            labelText={"Include Lowercase"}
            state={includeLowercase}
            setState={setIncludeLowercase}
          />
          <PasswordOptionBtn
            labelText={"Include Numbers"}
            state={includeNumbers}
            setState={setIncludeNumbers}
          />
          <PasswordOptionBtn
            labelText={"Include Symbols"}
            state={includeSymbols}
            setState={setIncludeSymbols}
          />
          <div className="pointer-events-none flex h-auto w-full justify-between bg-black bg-opacity-40 p-3 pl-6 pr-6 text-3xl">
            <div>STRENGTH</div>
            <div className="flex gap-2">
              <button className="h-full w-3 cursor-default border-2 border-white"></button>
              <button className="h-full w-3 cursor-default border-2 border-white"></button>
              <button className="h-full w-3 cursor-default border-2 border-white"></button>
              <button className="h-full w-3 cursor-default border-2 border-white"></button>
            </div>
          </div>
          <div
            className={`flex h-auto w-full  justify-center bg-opacity-80  
                        p-5 text-2xl text-gray-800 transition duration-75 ${
                          noOptionsSelected
                            ? "bg-gray-600 cursor-default"
                            : "bg-green-300 hover:bg-green-400 hover:bg-opacity-95 cursor-pointer"
                        } `}
            onClick={() => generatePassword()}
          >
            {noOptionsSelected ? "PLEASE SELECT OPTIONS" : "GENERATE"}
          </div>
        </div>
      </div>
    </div>
  );
}
