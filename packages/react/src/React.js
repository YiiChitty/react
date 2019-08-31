/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactVersion from 'shared/ReactVersion';
import {
  REACT_FRAGMENT_TYPE,
  REACT_PROFILER_TYPE,
  REACT_STRICT_MODE_TYPE,
  REACT_SUSPENSE_TYPE,
  REACT_SUSPENSE_LIST_TYPE,
} from 'shared/ReactSymbols';

import {Component, PureComponent} from './ReactBaseClasses';
import {createRef} from './ReactCreateRef';
import {forEach, map, count, toArray, only} from './ReactChildren';
import {
  createElement,
  createFactory,
  cloneElement,
  isValidElement,
  jsx,
} from './ReactElement';
import {createContext} from './ReactContext';
import {lazy} from './ReactLazy';
import forwardRef from './forwardRef';
import memo from './memo';
import {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useResponder,
} from './ReactHooks';
import {withSuspenseConfig} from './ReactBatchConfig';
import {
  createElementWithValidation,
  createFactoryWithValidation,
  cloneElementWithValidation,
  jsxWithValidation,
  jsxWithValidationStatic,
  jsxWithValidationDynamic,
} from './ReactElementValidator';
import ReactSharedInternals from './ReactSharedInternals';
import createFundamental from 'shared/createFundamentalComponent';
import createResponder from 'shared/createEventResponder';
import createScope from 'shared/createScope';
import {
  enableJSXTransformAPI,
  enableFlareAPI,
  enableFundamentalAPI,
  enableScopeAPI,
} from 'shared/ReactFeatureFlags';
const React = {
  /**
   * @public Children
   * 这个对象提供了一些处理 props.children 的方法
   * 因为 children 是一个类似数组但却不是数组的数据结构
   * 需要处理需要使用 React.Children 提供的这些方法
   *
   * @example
   * React.Children.map(this.props.children, child => return <li>{child}</li>)
   */
  Children: {
    map,
    forEach,
    count,
    toArray,
    only,
  },

  /**
   * @public createRef
   * 新的 ref 用法
   * React 即将抛弃 <div ref="myDiv" /> 这种 string ref 的用法，将来只能使用两种方式来使用 ref
   *
   * @example
   * class App extends React.Component {
   *   constructor() {
   *     this.ref = React.createRef()
   *   }
   *   render() {
   *     return <div ref={this.ref} />
   *     // or
   *     return <div ref={(node) => this.funRef = node} />
   *   }
   * }
   */
  createRef,

  /**
   * 下面两个类基本一致
   * 唯一的区别是 PureComponent 的原型上多了
   * !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
   *
   * React 中对比一个 ClassComponent 是否需要更新，只有两个地方。
   * 一是看有没有 shouldComponentUpdate 方法，
   * 二就是这里的 PureComponent 判断
   */
  Component,
  PureComponent,

  /**
   *
   * createContext 是官方定稿的 context 方案
   *
   * @example
   * const { Provider, Consumer } = React.createContext('defaultValue')
   */
  createContext,


  /**
   * forwardRef
   * 用来解决 HOC(Higher Order Component) 组件传递 ref 的问题的
   * 比如使用 redux 的时候，我们用 connect 来给组件绑定需要的 state
   * 这其中其实就是给我们的组件在外部包了一层组件，然后通过...props的方式把外部的props传入到实际组件。
   *
   * @example
   * const TargetComponent = React.forwardRef((props, ref) => <TargetComponent ref={ref} />)
   */
  forwardRef,
  lazy,
  memo,

  /**
   * React Hooks 相关
   */
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,

  Fragment: REACT_FRAGMENT_TYPE,
  Profiler: REACT_PROFILER_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  Suspense: REACT_SUSPENSE_TYPE,
  unstable_SuspenseList: REACT_SUSPENSE_LIST_TYPE,

  createElement: __DEV__ ? createElementWithValidation : createElement,
  cloneElement: __DEV__ ? cloneElementWithValidation : cloneElement,

  /**
   * createFactory
   * 用来创建专门用来创建某一类 ReactElement 的工厂，
   *
   * @example
   * export function createFactory(type) {
   *   const factory = createElement.bind(null, type)
   *   factory.type = type
   *   return factory
   * }
   */
  createFactory: __DEV__ ? createFactoryWithValidation : createFactory,
  isValidElement: isValidElement,

  version: ReactVersion,

  unstable_withSuspenseConfig: withSuspenseConfig,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,
};

if (enableFlareAPI) {
  React.unstable_useResponder = useResponder;
  React.unstable_createResponder = createResponder;
}

if (enableFundamentalAPI) {
  React.unstable_createFundamental = createFundamental;
}

if (enableScopeAPI) {
  React.unstable_createScope = createScope;
}

// Note: some APIs are added with feature flags.
// Make sure that stable builds for open source
// don't modify the React object to avoid deopts.
// Also let's not expose their names in stable builds.

if (enableJSXTransformAPI) {
  if (__DEV__) {
    React.jsxDEV = jsxWithValidation;
    React.jsx = jsxWithValidationDynamic;
    React.jsxs = jsxWithValidationStatic;
  } else {
    React.jsx = jsx;
    // we may want to special case jsxs internally to take advantage of static children.
    // for now we can ship identical prod functions
    React.jsxs = jsx;
  }
}

export default React;
