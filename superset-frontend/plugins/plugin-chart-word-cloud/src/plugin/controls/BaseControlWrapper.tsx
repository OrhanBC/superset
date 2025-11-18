/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { useMemo } from 'react';
import { ControlType } from '@superset-ui/chart-controls';
import Control from 'src/explore/components/Control';
import { useControlContext } from './ControlContext';

export interface BaseControlWrapperProps {
  name: string;
  type: ControlType;
  label?: string;
  description?: string;
  default?: any;
  renderTrigger?: boolean;
  clearable?: boolean;
  [key: string]: any; // Allow additional props to be passed through
}

/**
 * Base wrapper component that connects a React control component
 * to the control system by looking up control state from context.
 */
export const BaseControlWrapper = ({
  name,
  type,
  ...additionalProps
}: BaseControlWrapperProps) => {
  const { controls, actions } = useControlContext();
  const controlState = controls[name];

  if (!controlState) {
    // Control not found - this might happen during initialization
    return null;
  }

  // Merge control state with additional props
  // Additional props override control state values
  const controlProps = useMemo(
    () => ({
      ...controlState,
      ...additionalProps,
      name,
      type,
      actions,
    }),
    [controlState, additionalProps, name, type, actions],
  );

  return <Control {...controlProps} />;
};
