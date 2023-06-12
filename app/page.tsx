"use client";
import { RiFileCopyLine } from "react-icons/ri";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
var zxcvbn = require("zxcvbn");

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
  const [generatedPasswordStrength, setGeneratedPasswordStrength] = useState(0);
  const [zxcvbnObject, setZxcvbnObject] = useState<any>(zxcvbn("P4$5W0rD!"));
  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false);

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
      const zxcvbnResult = zxcvbn(pass);
      setGeneratedPassword(pass);
      setGeneratedPasswordStrength(zxcvbnResult.score);
      setZxcvbnObject(zxcvbnResult);
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
    }, 165);
  };

  return (
    <div className="flex min-h-screen w-screen max-w-full flex-col items-center bg-grayish-gradient ">
      <h1 className="mt-12 pb-6 font-mono text-3xl font-semibold text-gray-400 sm:mt-12 md:mt-32 lg:mt-36">
        Password Generator
      </h1>
      <div className="flex h-full w-5/6 flex-col gap-8 sm:w-auto md:w-[39rem] lg:w-[45rem] ">
        <div
          className="flex  h-24 w-full items-center justify-between rounded-sm bg-white bg-opacity-10 p-4 font-mono 
        text-4xl font-semibold tracking-wide text-white text-opacity-40 "
        >
          <input
            placeholder={generatedPassword}
            className={`h-full w-5/6 text-ellipsis bg-white bg-opacity-0 outline-none ${
              isCopyPressed
                ? "transition duration-100 placeholder:text-white placeholder:text-opacity-95"
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
          <p
            className="text-sm font-thin underline italic cursor-pointer"
            onClick={() => setShowMoreDetails(!showMoreDetails)}
          >
            {showMoreDetails ? "Hide" : "Show more details"}
          </p>

          {showMoreDetails ? (
            <div className="w-full rounded-sm p-1 text-sm font-bold bg-black bg-opacity-30 h-auto  cursor-default flex flex-col gap-2">
              <div className="">
                This password would take an estimated time of{" "}
                <span className="bg-opacity-40 bg-black overflow-auto w-fit inline-flex">
                  {Math.fround(
                    zxcvbnObject?.crack_times_seconds
                      ?.online_throttling_100_per_hour / 3.154e7
                  ).toFixed(2)}
                </span>{" "}
                years to crack
              </div>
            </div>
          ) : (
            <></>
          )}

          {showMoreDetails ? (
            <div className="bg-black bg-opacity-30 w-full rounded-sm p-1 pointer-events-none">
              <div className="text-sm">
                <div className="font-bold text-base mb-1">
                  Cracktimes for different scenarios:
                </div>
                <div className="mb-1">
                  Online, throttling, 0.027 hashes/sec:{" "}
                  <span className="bg-opacity-30 bg-black w-fit">
                    {
                      zxcvbnObject?.crack_times_display
                        ?.online_throttling_100_per_hour
                    }
                  </span>
                </div>
                <div className="mb-1">
                  Online, no throttling, 10 hashes/sec:{" "}
                  <span className="bg-opacity-30 bg-black w-fit">
                    {
                      zxcvbnObject?.crack_times_display
                        ?.online_no_throttling_10_per_second
                    }
                  </span>
                </div>
                <div className="mb-1">
                  Offline, 1e4 hashes/sec:{" "}
                  <span className="bg-opacity-30 bg-black w-fit">
                    {
                      zxcvbnObject?.crack_times_display
                        ?.offline_slow_hashing_1e4_per_second
                    }
                  </span>
                </div>

                <div className="mb-1">
                  Offline, 1e10 hashes/sec:{" "}
                  <span className="bg-opacity-30 bg-black w-fit">
                    {
                      zxcvbnObject?.crack_times_display
                        ?.offline_fast_hashing_1e10_per_second
                    }
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="pointer-events-none flex h-auto w-full justify-between bg-black bg-opacity-40 p-3 pl-6 pr-6 text-3xl">
            <div>STRENGTH</div>
            <div className="flex gap-2">
              <button
                className={`h-full w-3 cursor-default border-2 border-white ${
                  generatedPasswordStrength >= 1 ? "bg-white" : ""
                } `}
              ></button>
              <button
                className={`h-full w-3 cursor-default border-2 border-white ${
                  generatedPasswordStrength >= 2 ? "bg-white" : ""
                } `}
              ></button>
              <button
                className={`h-full w-3 cursor-default border-2 border-white ${
                  generatedPasswordStrength >= 3 ? "bg-white" : ""
                } `}
              ></button>
              <button
                className={`h-full w-3 cursor-default border-2 border-white ${
                  generatedPasswordStrength >= 4 ? "bg-white" : ""
                } `}
              ></button>
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
