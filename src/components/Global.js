import React, { useState, useEffect, useRef } from 'react';

export let globalRoute = "";
export const setGlobalRoute = (newRoute) => {
  globalRoute = newRoute;
};