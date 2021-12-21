import React, { useState, useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import has from 'lodash/has';

import { Chart } from 'regraph';
import { distances } from 'regraph/analysis';

import mapValues from 'lodash/mapValues';

import dataJSON from '../src/data.json';

function data() {
  const styles = createStyles().node;
  const nodeColorsDone = mapValues(rawData(), (value) => {
    if (value.type && styles[value.type]) {
      return { ...value, ...styles[value.type] };
    }
    return value;
  });
  const linkStylesDone = mapValues(nodeColorsDone, (value) => {
    const { id1, id2, end1, end2 } = value;
    if (id1 && id2) {
      return {
        ...value,
        width: 4,
        end1: { ...end1, color: nodeColorsDone[value.id1].color },
        end2: { ...end2, color: nodeColorsDone[value.id2].color },
      };
    }
    return value;
  });
  return linkStylesDone;
}

function rawData(){

let rData = {
  1:{
    label: {
      text: 'SOJA', color: "#000000", backgroundColor: "#ffffff"
    },
    type: 'disk'
  },
  2:{
    label: {
      text: 'MAIZ', color: "#000000", backgroundColor: "#ffffff"
    },
    type: 'business'
  },
  3:{
    label: {
      text: 'GIRASOL', color: "#000000", backgroundColor: "#ffffff"
    },
    type: 'switch'
  },
  4:{
    label: {
      text: 'SORGO', color: "#000000", backgroundColor: "#ffffff"
    },
    type: 'san'
  },
  5:{
    label: {
      text: 'TRIGO', color: "#000000", backgroundColor: "#ffffff"
    },
    type: 'server'
  },
}

//console.log("--datalength-->", Object.keys(rData).length);


const resData = dataJSON.map((data) => {
    
    let maxId = parseInt(Object.keys(rData).length + 1);
    let width = 1;
    console.log("--Precio--",data.Precio);
    if (data.Precio <= 3000){
      console.log("--3000--");
      width = 1;
    }else{
      if(data.Precio <= 6000){
        console.log("--6000--");
        width = 2;
      }else{
        if(data.Precio <= 9000){
          console.log("--9000--");
          width = 3;
        }else{
          if(data.Precio <= 12000){
            console.log("--12000--");
            width = 4;
          }else{
            if(data.Precio <= 15000){
              console.log("--15000--");
              width = 5;
            }else{
              if(data.Precio <= 18000){
                console.log("--18000--");
                width = 6;
              }else{
                if(data.Precio <= 21000){
                  console.log("--21000--");
                  width = 7;
                }else{
                  if(data.Precio <= 24000){
                    console.log("--24000--");
                    width = 8;
                  }else{
                    if(data.Precio <= 27000){
                      console.log("--27000--");
                      width = 9;
                    }else{
                      console.log("--30000--")
                      width = 10;
                    }
                  }
                }
              }
            }  
          }
        }
      }
    } 
     
     
     


    
    switch (data.Grano){
      case "SOJA":
        
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente: ${data.ID_Cliente}`, color: "#000000", backgroundColor: "#ffffff"
          },
          type: 'disk'
        }
    
        rData[`${data.ID_Cliente}-1`] = {
          id1: data.ID_Cliente,
          id2: '1',
          end1: { arrow: false },
          end2: { arrow: false },
          color: "#77FF33",
          width: `${width}`,
        }


        break;
      case "MAIZ":
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente: ${data.ID_Cliente}`, color: "#000000", backgroundColor: "#ffffff"
          },
          type: 'business'
        }
    
        
        rData[`${data.ID_Cliente}-2`] = {
          id1: data.ID_Cliente,
          id2: '2',
          end1: { arrow: false },
          end2: { arrow: false },
          color: "#F6FF33",
          width: `${width}`,
        }
        
        break;
      case "GIRASOL":
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente: ${data.ID_Cliente}`, color: "#000000", backgroundColor: "#ffffff"
          },
          type: 'switch'
        }
    
        rData[`${data.ID_Cliente}-3`] = {
          id1: data.ID_Cliente,
          id2: '3',
          end1: { arrow: false },
          end2: { arrow: false },
          color: "#FF3333",
          width: `${width}`,
        }
        break;
      case "SORGO":
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente: ${data.ID_Cliente}`, color: "#000000", backgroundColor: "#ffffff"
          },
          type: 'san'
        }
    
        rData[`${data.ID_Cliente}-4`] = {
          id1: data.ID_Cliente,
          id2: '4',
          end1: { arrow: false },
          end2: { arrow: false },
          color: "#335BFF",
          width: `${width}`,
        }
        break;
      case "TRIGO":
        rData[data.ID_Cliente] = {
          label: {
            text: `Cliente: ${data.ID_Cliente}`, color: "#000000", backgroundColor: "#ffffff"
          },
          type: 'server'
        }
    
        rData[`${data.ID_Cliente}-5`] = {
          id1: data.ID_Cliente,
          id2: '5',
          end1: { arrow: false },
          end2: { arrow: false },
          color: "#F633FF",
          width: `${width}`,
        }
        break;
    }
});


  console.log("--rData-->", rData);

  return rData;
}

function rawData_old2(){
  return {
    1:{
      label: {
        text: 'SOJA', color: "#fff00e", backgroundColor: "#eee225"
      },
      type: 'disk'
    },
    2:{
      label: {
        text: 'MAIZ', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    3:{
      label: {
        text: 'GIRASOL', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    4:{
      label: {
        text: 'SORGO', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    5:{
      label: {
        text: 'TRIGO', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    6:{
      label: {
        text: 'Cliente: 00005', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    7:{
      label: {
        text: 'Cliente: 00010', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    8:{
      label: {
        text: 'Cliente: 00012', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    9:{
      label: {
        text: 'Cliente: 00005', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    10:{
      label: {
        text: 'Cliente: 00010', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    11:{
      label: {
        text: 'Cliente: 00012', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    12:{
      label: {
        text: 'Cliente: 00012', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    13:{
      label: {
        text: 'Cliente: 00184', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    14:{
      label: {
        text: 'Cliente: 00285', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    15:{
      label: {
        text: 'Cliente: 00257', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    16:{
      label: {
        text: 'Cliente: 00257', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    17:{
      label: {
        text: 'Cliente: 00184', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    18:{
      label: {
        text: 'Cliente: 00078', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    19:{
      label: {
        text: 'Cliente: 00066', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    20:{
      label: {
        text: 'Cliente: 00246', color: "#2e3842", backgroundColor: "#f5f7fa50"
      },
      type: 'disk'
    },
    '6-1': {
      id1: '6',
      id2: '1',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '7-1': {
      id1: '7',
      id2: '1',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '8-1': {
      id1: '8',
      id2: '1',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '9-2': {
      id1: '9',
      id2: '2',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '10-2': {
      id1: '10',
      id2: '2',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '11-2': {
      id1: '11',
      id2: '2',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '12-2': {
      id1: '12',
      id2: '2',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '13-3': {
      id1: '13',
      id2: '3',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '14-3': {
      id1: '14',
      id2: '3',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '15-3': {
      id1: '15',
      id2: '3',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '16-3': {
      id1: '16',
      id2: '3',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '17-3': {
      id1: '17',
      id2: '3',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '18-4': {
      id1: '18',
      id2: '4',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '19-4': {
      id1: '19',
      id2: '4',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '20-4': {
      id1: '20',
      id2: '4',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '6-4': {
      id1: '6',
      id2: '4',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '7-4': {
      id1: '7',
      id2: '4',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '6-2': {
      id1: '6',
      id2: '2',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '7-2': {
      id1: '7',
      id2: '2',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '7-2': {
      id1: '7',
      id2: '2',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '7-2': {
      id1: '7',
      id2: '2',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '7-3': {
      id1: '7',
      id2: '3',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '7-3': {
      id1: '7',
      id2: '3',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '7-3': {
      id1: '7',
      id2: '3',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '7-3': {
      id1: '7',
      id2: '3',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '7-3': {
      id1: '7',
      id2: '3',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '10-5': {
      id1: '10',
      id2: '5',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '10-5': {
      id1: '10',
      id2: '5',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '10-5': {
      id1: '10',
      id2: '5',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
    '10-4': {
      id1: '4',
      id2: '10',
      end1: { arrow: false },
      end2: { arrow: false },
      color: "#606d7b",
      width: 4,
    },
  }
}

const processData = () => {
//logica segun campo segun cantidad
//investigar en la doc si se puede parametrizar el peso de la interaccion.
//Pintar las comunidad de distinto color.


  return data;
}

function createStyles() {
  return {
    node: {
      business: {
        color: "#8cedd0",
      },
      service: {
        color: "#2dcda8",
      },
      virtual: {
        color: "#048170",
      },
      server: {
        color: "#619EF7",
      },
      switch: {
        color: "#42BAC8",
      },
      san: {
        color: "#f15d5b",
      },
      disk: {
        color: "#00423e",
      },
    },
  };
}

function rawData_old() {
  return {
    1: {
      label: { text: 'Disk Drive 94', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    2: {
      label: { text: 'Disk Drive 22', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    3: {
      label: { text: 'Virtual Host 45', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    4: {
      label: { text: 'Service 42', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    5: {
      label: { text: 'Business Function 9', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    6: {
      label: { text: 'Service 36', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    7: {
      label: { text: 'Service 3', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    8: {
      label: { text: 'Virtual Host 2', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    9: {
      label: { text: 'Virtual Host 36', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    10: {
      label: { text: 'Disk Drive 45', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    11: {
      label: { text: 'Disk Drive 24', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    12: {
      label: { text: 'Disk Drive 62', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    13: {
      label: { text: 'Disk Drive 27', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    14: {
      label: { text: 'Switch 1', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'switch',
    },
    15: {
      label: { text: 'Virtual Host 62', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    16: {
      label: { text: 'Service 6', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    17: {
      label: { text: 'Virtual Host 47', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    18: {
      label: { text: 'Virtual Host 25', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    19: {
      label: { text: 'Disk Drive 77', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    20: {
      label: { text: 'Business Function 18', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    21: {
      label: { text: 'Virtual Host 0', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    22: {
      label: { text: 'Business Function 13', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    23: {
      label: { text: 'Disk Drive 81', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    24: {
      label: { text: 'Virtual Host 7', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    25: {
      label: { text: 'Service 28', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    26: {
      label: { text: 'Virtual Host 1', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    27: {
      label: { text: 'Virtual Host 92', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    28: {
      label: { text: 'Disk Drive 90', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    29: {
      label: { text: 'Disk Drive 8', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    30: {
      label: { text: 'Disk Drive 21', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    31: {
      label: { text: 'Business Function 7', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    32: {
      label: { text: 'Disk Drive 68', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    33: {
      label: { text: 'Disk Drive 35', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    34: {
      label: { text: 'Disk Drive 40', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    35: {
      label: { text: 'Disk Drive 25', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    36: {
      label: { text: 'Disk Drive 78', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    37: {
      label: { text: 'Virtual Host 97', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    38: {
      label: { text: 'Virtual Host 20', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    39: {
      label: { text: 'Disk Drive 61', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    40: {
      label: { text: 'Server 3', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    41: {
      label: { text: 'Disk Drive 60', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    42: {
      label: { text: 'Service 45', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    43: {
      label: { text: 'Disk Drive 66', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    44: {
      label: { text: 'Server 8', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    45: {
      label: { text: 'Business Function 4', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    46: {
      label: { text: 'Server 7', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    47: {
      label: { text: 'Virtual Host 49', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    48: {
      label: { text: 'Virtual Host 22', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    49: {
      label: { text: 'Disk Drive 57', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    50: {
      label: { text: 'Disk Drive 12', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    51: {
      label: { text: 'Virtual Host 37', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    52: {
      label: { text: 'Service 48', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    53: {
      label: { text: 'Disk Drive 72', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    54: {
      label: { text: 'Virtual Host 60', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    55: {
      label: { text: 'Business Function 3', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    56: {
      label: { text: 'Disk Drive 18', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    57: {
      label: { text: 'Virtual Host 69', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    58: {
      label: { text: 'Service 38', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    59: {
      label: { text: 'Virtual Host 5', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    60: {
      label: { text: 'Service 33', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    61: {
      label: { text: 'Disk Drive 79', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    62: {
      label: { text: 'Disk Drive 11', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    63: {
      label: { text: 'Server 9', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    64: {
      label: { text: 'Service 1', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    65: {
      label: { text: 'Virtual Host 8', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    66: {
      label: { text: 'Server 0', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    67: {
      label: { text: 'Business Function 15', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    68: {
      label: { text: 'Disk Drive 95', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    69: {
      label: { text: 'Virtual Host 91', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    70: {
      label: { text: 'Disk Drive 17xxx', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    71: {
      label: { text: 'Virtual Host 44', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    72: {
      label: { text: 'Business Function 8', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    73: {
      label: { text: 'Disk Drive 87', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    74: {
      label: { text: 'Disk Drive 91', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    75: {
      label: { text: 'Virtual Host 38', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    76: {
      label: { text: 'Disk Drive 53', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    77: {
      label: { text: 'Disk Drive 36', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    78: {
      label: { text: 'Virtual Host 32', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    79: {
      label: { text: 'Service 31', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    80: {
      label: { text: 'Disk Drive 83', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    81: {
      label: { text: 'Service 2', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    82: {
      label: { text: 'Virtual Host 12', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    83: {
      label: { text: 'Virtual Host 89', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    84: {
      label: { text: 'Virtual Host 80', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    85: {
      label: { text: 'Disk Drive 49', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    86: {
      label: { text: 'Service 19', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    87: {
      label: { text: 'Service 30', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    88: {
      label: { text: 'Virtual Host 86', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    89: {
      label: { text: 'Service 4', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    90: {
      label: { text: 'Virtual Host 78', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    91: {
      label: { text: 'Business Function 19', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    92: {
      label: { text: 'Server 10', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    93: {
      label: { text: 'Disk Drive 85', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    94: {
      label: { text: 'Server 12', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    95: {
      label: { text: 'Disk Drive 46', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    96: {
      label: { text: 'Virtual Host 58', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    97: {
      label: { text: 'Business Function 10', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    98: {
      label: { text: 'Service 9', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    99: {
      label: { text: 'Server 4', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    100: {
      label: { text: 'Virtual Host 19', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    101: {
      label: { text: 'Disk Drive 4', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    102: {
      label: { text: 'Virtual Host 55', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    103: {
      label: { text: 'Disk Drive 29', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    104: {
      label: { text: 'Disk Drive 96', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    105: {
      label: { text: 'Disk Drive 2', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    106: {
      label: { text: 'Service 27', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    107: {
      label: { text: 'Service 49', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    108: {
      label: { text: 'Service 41', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    109: {
      label: { text: 'Virtual Host 30', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    110: {
      label: { text: 'Server 5', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    111: {
      label: { text: 'Virtual Host 27', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    112: {
      label: { text: 'Disk Drive 20', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    113: {
      label: { text: 'Disk Drive 74', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    114: {
      label: { text: 'Disk Drive 92', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    115: {
      label: { text: 'Server 1', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    116: {
      label: { text: 'Virtual Host 70', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    117: {
      label: { text: 'Disk Drive 69', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    118: {
      label: { text: 'Virtual Host 9', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    119: {
      label: { text: 'Virtual Host 68', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    120: {
      label: { text: 'Disk Drive 9', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    121: {
      label: { text: 'Virtual Host 18', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    122: {
      label: { text: 'Business Function 14', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    123: {
      label: { text: 'Business Function 17', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    124: {
      label: { text: 'Disk Drive 58', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    125: {
      label: { text: 'Disk Drive 86', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    126: {
      label: { text: 'Virtual Host 23', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    127: {
      label: { text: 'Virtual Host 73', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    128: {
      label: { text: 'Virtual Host 59', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    129: {
      label: { text: 'Virtual Host 46', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    130: {
      label: { text: 'Service 15', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    131: {
      label: { text: 'Virtual Host 63', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    132: {
      label: { text: 'Service 5', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    133: {
      label: { text: 'Disk Drive 26', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    134: {
      label: { text: 'Virtual Host 83', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    135: {
      label: { text: 'Disk Drive 28', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    136: {
      label: { text: 'Virtual Host 82', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    137: {
      label: { text: 'Virtual Host 99', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    138: {
      label: { text: 'Virtual Host 4', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    139: {
      label: { text: 'Disk Drive 34', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    140: {
      label: { text: 'Virtual Host 76', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    141: {
      label: { text: 'SAN Unit 2', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'san',
    },
    142: {
      label: { text: 'Disk Drive 1', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    143: {
      label: { text: 'Disk Drive 7', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    144: {
      label: { text: 'Service 29', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    145: {
      label: { text: 'Virtual Host 77', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    146: {
      label: { text: 'Virtual Host 52', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    147: {
      label: { text: 'Disk Drive 89', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    148: {
      label: { text: 'Disk Drive 64', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    149: {
      label: { text: 'Service 8', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    150: {
      label: { text: 'Virtual Host 51', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    151: {
      label: { text: 'Virtual Host 74', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    152: {
      label: { text: 'Virtual Host 29', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    153: {
      label: { text: 'Service 47', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    154: {
      label: { text: 'Service 37', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    155: {
      label: { text: 'Virtual Host 61', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    156: {
      label: { text: 'Virtual Host 79', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    157: {
      label: { text: 'Virtual Host 95', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    158: {
      label: { text: 'Virtual Host 85', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    159: {
      label: { text: 'Disk Drive 48', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    160: {
      label: { text: 'Disk Drive 3', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    161: {
      label: { text: 'Virtual Host 21', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    162: {
      label: { text: 'Virtual Host 17', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    163: {
      label: { text: 'Disk Drive 14', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    164: {
      label: { text: 'Service 26', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    165: {
      label: { text: 'Disk Drive 88', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    166: {
      label: { text: 'Disk Drive 37', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    167: {
      label: { text: 'Virtual Host 24', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    168: {
      label: { text: 'Virtual Host 84', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    169: {
      label: { text: 'Disk Drive 38', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    170: {
      label: { text: 'Virtual Host 16', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    171: {
      label: { text: 'Disk Drive 31', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    172: {
      label: { text: 'Disk Drive 0', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    173: {
      label: { text: 'Virtual Host 14', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    174: {
      label: { text: 'Service 18', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    175: {
      label: { text: 'Disk Drive 56', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    176: {
      label: { text: 'Disk Drive 97', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    177: {
      label: { text: 'Service 43', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    178: {
      label: { text: 'Disk Drive 93', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    179: {
      label: { text: 'Disk Drive 43', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    180: {
      label: { text: 'Server 19', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    181: {
      label: { text: 'Disk Drive 75', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    182: {
      label: { text: 'Disk Drive 55', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    183: {
      label: { text: 'Switch 4', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'switch',
    },
    184: {
      label: { text: 'Disk Drive 33', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    185: {
      label: { text: 'Virtual Host 13', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    186: {
      label: { text: 'Disk Drive 67', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    187: {
      label: { text: 'Server 17', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    188: {
      label: { text: 'Disk Drive 63', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    189: {
      label: { text: 'Service 20', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    190: {
      label: { text: 'Disk Drive 51', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    191: {
      label: { text: 'Disk Drive 32', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    192: {
      label: { text: 'Disk Drive 65', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    193: {
      label: { text: 'Virtual Host 11', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    194: {
      label: { text: 'Disk Drive 13', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    195: {
      label: { text: 'Server 16', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    196: {
      label: { text: 'Service 32', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    197: {
      label: { text: 'Virtual Host 35', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    198: {
      label: { text: 'Service 25', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    199: {
      label: { text: 'Virtual Host 96', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    200: {
      label: { text: 'Switch 3', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'switch',
    },
    201: {
      label: { text: 'Disk Drive 5', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    202: {
      label: { text: 'Business Function 11', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    203: {
      label: { text: 'Virtual Host 41', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    204: {
      label: { text: 'Virtual Host 98', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    205: {
      label: { text: 'Disk Drive 42', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    206: {
      label: { text: 'Virtual Host 26', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    207: {
      label: { text: 'Server 11', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    208: {
      label: { text: 'Service 17', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    209: {
      label: { text: 'Disk Drive 44', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    210: {
      label: { text: 'Switch 2', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'switch',
    },
    211: {
      label: { text: 'Service 40', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    212: {
      label: { text: 'Virtual Host 42', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    213: {
      label: { text: 'Disk Drive 73', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    214: {
      label: { text: 'Business Function 1', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    215: {
      label: { text: 'Virtual Host 81', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    216: {
      label: { text: 'Disk Drive 50', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    217: {
      label: { text: 'Virtual Host 56', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    218: {
      label: { text: 'Disk Drive 80', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    219: {
      label: { text: 'Virtual Host 75', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    220: {
      label: { text: 'Virtual Host 94', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    221: {
      label: { text: 'Service 34', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    222: {
      label: { text: 'Service 22', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    223: {
      label: { text: 'Business Function 5', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    224: {
      label: { text: 'Virtual Host 93', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    225: {
      label: { text: 'Virtual Host 40', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    226: {
      label: { text: 'Disk Drive 98', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    227: {
      label: { text: 'Server 2', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    228: {
      label: { text: 'Switch 0', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'switch',
    },
    229: {
      label: { text: 'Virtual Host 65', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    230: {
      label: { text: 'Disk Drive 19', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    231: {
      label: { text: 'SAN Unit 1', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'san',
    },
    232: {
      label: { text: 'Virtual Host 28', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    233: {
      label: { text: 'Service 12', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    234: {
      label: { text: 'Service 11', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    235: {
      label: { text: 'Server 13', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    236: {
      label: { text: 'Disk Drive 16', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    237: {
      label: { text: 'Virtual Host 57', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    238: {
      label: { text: 'Disk Drive 82', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    239: {
      label: { text: 'Virtual Host 67', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    240: {
      label: { text: 'Service 24', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    241: {
      label: { text: 'Business Function 0', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    242: {
      label: { text: 'Virtual Host 90', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    243: {
      label: { text: 'Virtual Host 50', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    244: {
      label: { text: 'Virtual Host 71', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    245: {
      label: { text: 'Server 14', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    246: {
      label: { text: 'Service 0', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    247: {
      label: { text: 'Server 18', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    248: {
      label: { text: 'Service 13', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    249: {
      label: { text: 'Virtual Host 87', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    250: {
      label: { text: 'Service 35', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    251: {
      label: { text: 'Disk Drive 54', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    252: {
      label: { text: 'Service 7', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    253: {
      label: { text: 'Virtual Host 31', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    254: {
      label: { text: 'Virtual Host 6', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    255: {
      label: { text: 'Service 21', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    256: {
      label: { text: 'Virtual Host 88', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    257: {
      label: { text: 'Service 39', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    258: {
      label: { text: 'Business Function 16', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    259: {
      label: { text: 'Business Function 6', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    260: {
      label: { text: 'Service 44', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    261: {
      label: { text: 'Virtual Host 64', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    262: {
      label: { text: 'Business Function 12', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    263: {
      label: { text: 'Service 14', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    264: {
      label: { text: 'Virtual Host 54', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    265: {
      label: { text: 'Disk Drive 6', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    266: {
      label: { text: 'Virtual Host 43', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    267: {
      label: { text: 'Disk Drive 71', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    268: {
      label: { text: 'Disk Drive 41', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    269: {
      label: { text: 'Virtual Host 53', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    270: {
      label: { text: 'Business Function 2', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'business',
    },
    271: {
      label: { text: 'Disk Drive 10', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    272: {
      label: { text: 'Disk Drive 39', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    273: {
      label: { text: 'Virtual Host 34', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    274: {
      label: { text: 'Disk Drive 47', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    275: {
      label: { text: 'Virtual Host 10', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    276: {
      label: { text: 'Server 6', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    277: {
      label: { text: 'Service 23', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    278: {
      label: { text: 'Server 15', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'server',
    },
    279: {
      label: { text: 'Virtual Host 3', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    280: {
      label: { text: 'Disk Drive 52', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    281: {
      label: { text: 'Disk Drive 76', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    282: {
      label: { text: 'SAN Unit 0', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'san',
    },
    283: {
      label: { text: 'Virtual Host 39', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    284: {
      label: { text: 'Disk Drive 70', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    285: {
      label: { text: 'Disk Drive 59', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    286: {
      label: { text: 'Service 46', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    287: {
      label: { text: 'Disk Drive 15', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    288: {
      label: { text: 'Virtual Host 66', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    289: {
      label: { text: 'Disk Drive 30', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    290: {
      label: { text: 'Virtual Host 48', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    291: {
      label: { text: 'Virtual Host 72', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    292: {
      label: { text: 'Disk Drive 99', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    293: {
      label: { text: 'Virtual Host 33', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    294: {
      label: { text: 'Virtual Host 15', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'virtual',
    },
    295: {
      label: { text: 'Disk Drive 23', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    296: {
      label: { text: 'Service 10', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    297: {
      label: { text: 'Service 16', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'service',
    },
    298: {
      label: { text: 'Disk Drive 84', color: "#2e3842", backgroundColor: "#f5f7fa50" },
      type: 'disk',
    },
    '89-71': {
      id1: '89',
      id2: '71',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '106-96': {
      id1: '106',
      id2: '96',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '291-92': {
      id1: '291',
      id2: '92',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '189-217': {
      id1: '189',
      id2: '217',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '16-229': {
      id1: '16',
      id2: '229',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '102-276': {
      id1: '102',
      id2: '276',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '98-215': {
      id1: '98',
      id2: '215',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '151-278': {
      id1: '151',
      id2: '278',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '141-171': {
      id1: '141',
      id2: '171',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '255-273': {
      id1: '255',
      id2: '273',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '75-92': {
      id1: '75',
      id2: '92',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '255-173': {
      id1: '255',
      id2: '173',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '31-98': {
      id1: '31',
      id2: '98',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '240-69': {
      id1: '240',
      id2: '69',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '294-195': {
      id1: '294',
      id2: '195',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '71-278': {
      id1: '71',
      id2: '278',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '241-7': {
      id1: '241',
      id2: '7',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '239-180': {
      id1: '239',
      id2: '180',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '138-110': {
      id1: '138',
      id2: '110',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '170-207': {
      id1: '170',
      id2: '207',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '155-40': {
      id1: '155',
      id2: '40',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '130-232': {
      id1: '130',
      id2: '232',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '66-141': {
      id1: '66',
      id2: '141',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '257-185': {
      id1: '257',
      id2: '185',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '83-227': {
      id1: '83',
      id2: '227',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '161-245': {
      id1: '161',
      id2: '245',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '174-204': {
      id1: '174',
      id2: '204',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '63-14': {
      id1: '63',
      id2: '14',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '293-195': {
      id1: '293',
      id2: '195',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '187-200': {
      id1: '187',
      id2: '200',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '45-240': {
      id1: '45',
      id2: '240',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '231-101': {
      id1: '231',
      id2: '101',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '67-177': {
      id1: '67',
      id2: '177',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '40-141': {
      id1: '40',
      id2: '141',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '119-99': {
      id1: '119',
      id2: '99',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '79-146': {
      id1: '79',
      id2: '146',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '44-141': {
      id1: '44',
      id2: '141',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '137-195': {
      id1: '137',
      id2: '195',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '290-247': {
      id1: '290',
      id2: '247',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '234-283': {
      id1: '234',
      id2: '283',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '196-288': {
      id1: '196',
      id2: '288',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '282-166': {
      id1: '282',
      id2: '166',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '123-250': {
      id1: '123',
      id2: '250',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '153-150': {
      id1: '153',
      id2: '150',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '196-162': {
      id1: '196',
      id2: '162',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '202-257': {
      id1: '202',
      id2: '257',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '67-246': {
      id1: '67',
      id2: '246',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '145-99': {
      id1: '145',
      id2: '99',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '21-46': {
      id1: '21',
      id2: '46',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '154-88': {
      id1: '154',
      id2: '88',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '26-44': {
      id1: '26',
      id2: '44',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '126-247': {
      id1: '126',
      id2: '247',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '279-94': {
      id1: '279',
      id2: '94',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '257-294': {
      id1: '257',
      id2: '294',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '110-231': {
      id1: '110',
      id2: '231',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '64-47': {
      id1: '64',
      id2: '47',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '116-245': {
      id1: '116',
      id2: '245',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '42-290': {
      id1: '42',
      id2: '290',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '52-75': {
      id1: '52',
      id2: '75',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '207-141': {
      id1: '207',
      id2: '141',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '122-198': {
      id1: '122',
      id2: '198',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '121-207': {
      id1: '121',
      id2: '207',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '51-66': {
      id1: '51',
      id2: '66',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '282-165': {
      id1: '282',
      id2: '165',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '177-146': {
      id1: '177',
      id2: '146',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '261-46': {
      id1: '261',
      id2: '46',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '282-77': {
      id1: '282',
      id2: '77',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '264-235': {
      id1: '264',
      id2: '235',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '88-207': {
      id1: '88',
      id2: '207',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '65-227': {
      id1: '65',
      id2: '227',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '106-173': {
      id1: '106',
      id2: '173',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '130-59': {
      id1: '130',
      id2: '59',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '152-187': {
      id1: '152',
      id2: '187',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '243-276': {
      id1: '243',
      id2: '276',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '4-121': {
      id1: '4',
      id2: '121',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '237-94': {
      id1: '237',
      id2: '94',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '92-228': {
      id1: '92',
      id2: '228',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '6-47': {
      id1: '6',
      id2: '47',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '248-26': {
      id1: '248',
      id2: '26',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '189-71': {
      id1: '189',
      id2: '71',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '211-127': {
      id1: '211',
      id2: '127',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '86-17': {
      id1: '86',
      id2: '17',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '240-253': {
      id1: '240',
      id2: '253',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '96-94': {
      id1: '96',
      id2: '94',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '79-118': {
      id1: '79',
      id2: '118',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '258-106': {
      id1: '258',
      id2: '106',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '167-115': {
      id1: '167',
      id2: '115',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '86-249': {
      id1: '86',
      id2: '249',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '59-235': {
      id1: '59',
      id2: '235',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '234-138': {
      id1: '234',
      id2: '138',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '203-115': {
      id1: '203',
      id2: '115',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '215-40': {
      id1: '215',
      id2: '40',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '278-228': {
      id1: '278',
      id2: '228',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '282-23': {
      id1: '282',
      id2: '23',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '100-115': {
      id1: '100',
      id2: '115',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '231-53': {
      id1: '231',
      id2: '53',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '233-243': {
      id1: '233',
      id2: '243',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '231-124': {
      id1: '231',
      id2: '124',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '97-263': {
      id1: '97',
      id2: '263',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '108-136': {
      id1: '108',
      id2: '136',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '248-264': {
      id1: '248',
      id2: '264',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '220-115': {
      id1: '220',
      id2: '115',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '162-235': {
      id1: '162',
      id2: '235',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '258-108': {
      id1: '258',
      id2: '108',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '72-196': {
      id1: '72',
      id2: '196',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '47-46': {
      id1: '47',
      id2: '46',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '198-119': {
      id1: '198',
      id2: '119',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '78-66': {
      id1: '78',
      id2: '66',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '66-183': {
      id1: '66',
      id2: '183',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '111-44': {
      id1: '111',
      id2: '44',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '141-50': {
      id1: '141',
      id2: '50',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '60-152': {
      id1: '60',
      id2: '152',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '7-173': {
      id1: '7',
      id2: '173',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '245-141': {
      id1: '245',
      id2: '141',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '63-282': {
      id1: '63',
      id2: '282',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '122-87': {
      id1: '122',
      id2: '87',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '198-102': {
      id1: '198',
      id2: '102',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '248-173': {
      id1: '248',
      id2: '173',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '69-92': {
      id1: '69',
      id2: '92',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '60-140': {
      id1: '60',
      id2: '140',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '42-47': {
      id1: '42',
      id2: '47',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '31-257': {
      id1: '31',
      id2: '257',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '217-180': {
      id1: '217',
      id2: '180',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '282-125': {
      id1: '282',
      id2: '125',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '5-260': {
      id1: '5',
      id2: '260',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '270-234': {
      id1: '270',
      id2: '234',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '4-129': {
      id1: '4',
      id2: '129',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '46-282': {
      id1: '46',
      id2: '282',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '199-227': {
      id1: '199',
      id2: '227',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '197-40': {
      id1: '197',
      id2: '40',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '37-40': {
      id1: '37',
      id2: '40',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '278-141': {
      id1: '278',
      id2: '141',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '5-25': {
      id1: '5',
      id2: '25',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '263-243': {
      id1: '263',
      id2: '243',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '94-231': {
      id1: '94',
      id2: '231',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '15-195': {
      id1: '15',
      id2: '195',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '208-15': {
      id1: '208',
      id2: '15',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '64-279': {
      id1: '64',
      id2: '279',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '132-185': {
      id1: '132',
      id2: '185',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '79-261': {
      id1: '79',
      id2: '261',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '3-94': {
      id1: '3',
      id2: '94',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '223-286': {
      id1: '223',
      id2: '286',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '115-282': {
      id1: '115',
      id2: '282',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '266-66': {
      id1: '266',
      id2: '66',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '269-195': {
      id1: '269',
      id2: '195',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '91-252': {
      id1: '91',
      id2: '252',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '282-85': {
      id1: '282',
      id2: '85',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '247-141': {
      id1: '247',
      id2: '141',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '90-92': {
      id1: '90',
      id2: '92',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '235-282': {
      id1: '235',
      id2: '282',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '40-14': {
      id1: '40',
      id2: '14',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '207-14': {
      id1: '207',
      id2: '14',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '225-63': {
      id1: '225',
      id2: '63',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '150-92': {
      id1: '150',
      id2: '92',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '118-207': {
      id1: '118',
      id2: '207',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '58-21': {
      id1: '58',
      id2: '21',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '276-14': {
      id1: '276',
      id2: '14',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '22-149': {
      id1: '22',
      id2: '149',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '129-44': {
      id1: '129',
      id2: '44',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '89-69': {
      id1: '89',
      id2: '69',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '110-210': {
      id1: '110',
      id2: '210',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '219-99': {
      id1: '219',
      id2: '99',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '153-269': {
      id1: '153',
      id2: '269',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '223-198': {
      id1: '223',
      id2: '198',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '8-66': {
      id1: '8',
      id2: '66',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '221-253': {
      id1: '221',
      id2: '253',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '146-278': {
      id1: '146',
      id2: '278',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '20-107': {
      id1: '20',
      id2: '107',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '141-77': {
      id1: '141',
      id2: '77',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '296-119': {
      id1: '296',
      id2: '119',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '164-162': {
      id1: '164',
      id2: '162',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '54-245': {
      id1: '54',
      id2: '245',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '212-227': {
      id1: '212',
      id2: '227',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '259-58': {
      id1: '259',
      id2: '58',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '127-46': {
      id1: '127',
      id2: '46',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '115-183': {
      id1: '115',
      id2: '183',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '198-288': {
      id1: '198',
      id2: '288',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '297-273': {
      id1: '297',
      id2: '273',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '273-235': {
      id1: '273',
      id2: '235',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '249-94': {
      id1: '249',
      id2: '94',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '231-33': {
      id1: '231',
      id2: '33',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '25-38': {
      id1: '25',
      id2: '38',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '153-161': {
      id1: '153',
      id2: '161',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '276-282': {
      id1: '276',
      id2: '282',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '214-87': {
      id1: '214',
      id2: '87',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '99-282': {
      id1: '99',
      id2: '282',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '131-207': {
      id1: '131',
      id2: '207',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '247-183': {
      id1: '247',
      id2: '183',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '52-145': {
      id1: '52',
      id2: '145',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '195-228': {
      id1: '195',
      id2: '228',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '262-130': {
      id1: '262',
      id2: '130',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '156-276': {
      id1: '156',
      id2: '276',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '87-37': {
      id1: '87',
      id2: '37',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '288-180': {
      id1: '288',
      id2: '180',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '55-132': {
      id1: '55',
      id2: '132',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '99-14': {
      id1: '99',
      id2: '14',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '204-187': {
      id1: '204',
      id2: '187',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '206-276': {
      id1: '206',
      id2: '276',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '91-4': {
      id1: '91',
      id2: '4',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '211-249': {
      id1: '211',
      id2: '249',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '84-99': {
      id1: '84',
      id2: '99',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '187-141': {
      id1: '187',
      id2: '141',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '224-92': {
      id1: '224',
      id2: '92',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '82-40': {
      id1: '82',
      id2: '40',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '57-99': {
      id1: '57',
      id2: '99',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '154-111': {
      id1: '154',
      id2: '111',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '193-276': {
      id1: '193',
      id2: '276',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '180-200': {
      id1: '180',
      id2: '200',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '260-102': {
      id1: '260',
      id2: '102',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '108-156': {
      id1: '108',
      id2: '156',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '256-115': {
      id1: '256',
      id2: '115',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '275-247': {
      id1: '275',
      id2: '247',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '168-276': {
      id1: '168',
      id2: '276',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '253-110': {
      id1: '253',
      id2: '110',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '235-228': {
      id1: '235',
      id2: '228',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '252-59': {
      id1: '252',
      id2: '59',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '286-212': {
      id1: '286',
      id2: '212',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '38-99': {
      id1: '38',
      id2: '99',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '92-282': {
      id1: '92',
      id2: '282',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '17-110': {
      id1: '17',
      id2: '110',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '132-8': {
      id1: '132',
      id2: '8',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '231-271': {
      id1: '231',
      id2: '271',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '229-276': {
      id1: '229',
      id2: '276',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '245-14': {
      id1: '245',
      id2: '14',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '157-44': {
      id1: '157',
      id2: '44',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '244-235': {
      id1: '244',
      id2: '235',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '140-40': {
      id1: '140',
      id2: '40',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '232-40': {
      id1: '232',
      id2: '40',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '241-257': {
      id1: '241',
      id2: '257',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '81-109': {
      id1: '81',
      id2: '109',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '87-273': {
      id1: '87',
      id2: '273',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '7-167': {
      id1: '7',
      id2: '167',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '141-61': {
      id1: '141',
      id2: '61',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '154-220': {
      id1: '154',
      id2: '220',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '255-47': {
      id1: '255',
      id2: '47',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '44-14': {
      id1: '44',
      id2: '14',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '196-244': {
      id1: '196',
      id2: '244',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '250-3': {
      id1: '250',
      id2: '3',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '246-116': {
      id1: '246',
      id2: '116',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '136-66': {
      id1: '136',
      id2: '66',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '214-144': {
      id1: '214',
      id2: '144',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '283-115': {
      id1: '283',
      id2: '115',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '24-66': {
      id1: '24',
      id2: '66',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '286-279': {
      id1: '286',
      id2: '279',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '262-107': {
      id1: '262',
      id2: '107',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '259-174': {
      id1: '259',
      id2: '174',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '180-231': {
      id1: '180',
      id2: '231',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '106-170': {
      id1: '106',
      id2: '170',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '9-247': {
      id1: '9',
      id2: '247',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '227-200': {
      id1: '227',
      id2: '200',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '211-27': {
      id1: '211',
      id2: '27',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '94-200': {
      id1: '94',
      id2: '200',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '242-180': {
      id1: '242',
      id2: '180',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '227-282': {
      id1: '227',
      id2: '282',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '55-277': {
      id1: '55',
      id2: '277',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '141-236': {
      id1: '141',
      id2: '236',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '164-167': {
      id1: '164',
      id2: '167',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '177-243': {
      id1: '177',
      id2: '243',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '48-40': {
      id1: '48',
      id2: '40',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '149-269': {
      id1: '149',
      id2: '269',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '222-131': {
      id1: '222',
      id2: '131',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '173-195': {
      id1: '173',
      id2: '195',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '144-26': {
      id1: '144',
      id2: '26',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '286-193': {
      id1: '286',
      id2: '193',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '6-102': {
      id1: '6',
      id2: '102',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '89-3': {
      id1: '89',
      id2: '3',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '25-138': {
      id1: '25',
      id2: '138',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '46-14': {
      id1: '46',
      id2: '14',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '42-78': {
      id1: '42',
      id2: '78',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '123-60': {
      id1: '123',
      id2: '60',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '18-195': {
      id1: '18',
      id2: '195',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '27-278': {
      id1: '27',
      id2: '278',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '107-197': {
      id1: '107',
      id2: '197',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '195-231': {
      id1: '195',
      id2: '231',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '158-195': {
      id1: '158',
      id2: '195',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '128-207': {
      id1: '128',
      id2: '207',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '109-66': {
      id1: '109',
      id2: '66',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '81-266': {
      id1: '81',
      id2: '266',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '22-16': {
      id1: '22',
      id2: '16',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '58-84': {
      id1: '58',
      id2: '84',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '64-273': {
      id1: '64',
      id2: '273',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '277-237': {
      id1: '277',
      id2: '237',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '185-46': {
      id1: '185',
      id2: '46',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '254-66': {
      id1: '254',
      id2: '66',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '87-152': {
      id1: '87',
      id2: '152',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
    '134-276': {
      id1: '134',
      id2: '276',
      end1: { arrow: false },
      end2: { arrow: true },
      color: "#606d7b",
      width: 4,
    },
  };
}

export default data;


// Randomly generate 200 data points
function generateData() {
  const items = {};
  for (let i = 0; i < 200; i += 1) {
    items[`dt${i}`] = {
      // Set the date to be today minus a random number of days
      times: [{ time: new Date() - 1000 * 60 * 60 * 24 * (Math.random() * 100) }],
    };
  }
  return items;
}

const dataTime = generateData();

function isNode(item) {
  return !has(item, 'id1');
}

export const Demo1 = () => <Filtering items={data()} />;

function Filtering(props) {
  // the full unfiltered data
  const { items: allItems } = props;
  // items to be shown by ReGraph
  const [state, setState] = useState({
    items: allItems,
    layout: {},
    positions: {},
    selection: {},
  });
  const savedPositions = useRef({});

  const findSubGraph = async (nodeId) => {
    const subGraphIds = await distances(allItems, nodeId, { direction: 'to' });

    return pickBy(allItems, (item, id) => {
      // Get the nodes present in the subgraph.
      if (has(subGraphIds, id)) {
        return true;
      }
      // Get links which have the nodes at both ends in the subgraph.
      if (!isNode(item)) {
        return has(subGraphIds, item.id1) && has(subGraphIds, item.id2);
      }
      return false;
    });
  };

  const chartChangeHandler = async ({ positions: newPositions, selection: newSelection }) => {
    // After running the initial layout, store all the
    // positions so they can be restored later.
    if (!isEmpty(newPositions) && isEmpty(savedPositions.current)) {
      savedPositions.current = { ...newPositions };
    }

    if (newSelection) {
      if (!isEmpty(newSelection)) {
        const id = Object.keys(newSelection)[0];
        if (isNode(allItems[id])) {
          const subGraph = await findSubGraph(id);
          setState(() => {
            return {
              items: subGraph, // replace items with just the subGraph
              layout: {
                name: 'sequential',
                top: id,
                orientation: 'right',
                curvedLinks: true,
                stretch: 3,
                tightness: 9,
              },
              positions: {}, // force the new layout to run
              selection: newSelection,
            };
          });
        }
      } else {
        setState(() => {
          return {
            items: allItems,
            layout: { curvedLinks: false },
            positions: savedPositions.current,
            selection: newSelection,
          };
        });
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Chart
        items={state.items}
        positions={state.positions}
        selection={state.selection}
        layout={state.layout}
        // disable dragging of nodes
        onDragStart={({ preventDefault, type, id }) => {
          if (id && isNode(state.items[id])) {
            preventDefault();
          }
        }}
        onChange={chartChangeHandler}
        animation={{ animate: true, time: 850 }}
      />
    </div>
  );
}
