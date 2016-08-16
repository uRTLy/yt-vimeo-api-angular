import angular from 'angular';
import InputComponent from './input.component';

const Input = angular
.module('Input', [])
.component('inputComponent', InputComponent)
.name;

export default Input;
