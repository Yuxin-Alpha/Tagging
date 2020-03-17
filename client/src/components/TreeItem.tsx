import * as React from "react";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { ITreeItemProp, ITreeData } from "../types/project";
import "../styles/tree-item.less";

function handleDelete(data: ITreeData[], id: number) {
  data = data.filter(item => {
    if (item.children && item.children.length > 0) {
      item.children = handleDelete(item.children, id);
    }
    return item.id !== id;
  });
  return data;
}

function handleAdd(data: ITreeData[], id: number) {
  let pointer: ITreeData | undefined;
  function next(arr: ITreeData[]) {
    if (pointer) {
      return;
    }
    for (const item of arr) {
      if (item.id === id) {
        pointer = item;
        break;
      } else if (item.children && (item.children as ITreeData[]).length > 0) {
        next(item.children as ITreeData[]);
      }
    }
  }
  next(data);
  return pointer;
}
export default function TreeItem(props: ITreeItemProp) {
  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowHandle(true);
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowHandle(false);
  };
  const showDataInput = () => {
    setShowInput(true);
  };
  const changInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const saveInputValue = () => {
    setShowInput(false);
  };
  const addData = (data: ITreeData[], id: number) => {
    const target: ITreeData | undefined = handleAdd(data, id);
    const item: ITreeData = {
      id: 33,
      key: "33",
      label: "ds"
    };
    if (target === undefined) {
      return;
    } else if (target.children && target.children.length > 0) {
      target.children.push(item);
    } else {
      target.children = [];
      target.children.push(item);
    }
    props.freshData(data);
  };
  const deleteData = (data: ITreeData[], id: number) => {
    const list = handleDelete(data, id);
    props.freshData(list);
  };
  const [showInput, setShowInput] = React.useState(false);
  const [showHandle, setShowHandle] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(props.title);
  return (
    <div
      className="tree--item"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="tree--item_left" onDoubleClick={showDataInput}>
        {showInput ? (
          <input
            autoFocus={true}
            value={inputValue}
            onChange={changInputValue}
            onBlur={saveInputValue}
            type="text"
          />
        ) : (
          inputValue
        )}
      </div>
      {showHandle && (
        <div className="tree--item_right">
          <span
            onClick={e => {
              e.stopPropagation();
              addData(props.treeData, props.id);
            }}
          >
            <PlusCircleOutlined />
          </span>
          <span
            onClick={() => {
              deleteData(props.treeData, props.id);
            }}
          >
            <CloseCircleOutlined />
          </span>
        </div>
      )}
    </div>
  );
}
