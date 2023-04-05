import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import TypingAnimation from "@/components/TypingAnimation";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    sendMessage(inputValue);

    setInputValue("");
  };

  const sendMessage = (message) => {
    const url = "/api/chat";

    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };

    setIsLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: response.data.choices[0].message.content },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <div className="container mx-auto max-w-full flex  items-center flex-col h-screen bg-black pt-10">
        <div className="">
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text text-center py-3 font-bold text-5xl">
            CHATGPT-by-B
          </h1>
          <div className="flex flex-col p-7">
            <div className="flex flex-col space-y-4">
              {chatLog.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      message.type === "user" ? "bg-purple-700" : "bg-blue-700"
                    } rounded-xl p-4 text-white max-w-sm`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div key={chatLog.length} className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                    <TypingAnimation />
                  </div>
                </div>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex-none p-5">
            <div className="flex rounded-xl border border-gray-600 bg-gray-700">
              <input
                type="text"
                className="flex-grow px-4 py-2 rounded-xl bg-transparent text-white focus:outline-none"
                placeholder="taper votre messagge"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-purple-600 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-900 transition-colors duration-400"
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
