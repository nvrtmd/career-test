import { createContext } from "react"
import React, { Component } from "react";

const userInfo = createContext({
    user: {name: '', gender: ''},
    actions: {
        setName: () => {},
        setGender: () => {}
    }
})

export default userInfo;