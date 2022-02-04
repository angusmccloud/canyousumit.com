import { Draggable } from "react-beautiful-dnd";
import React from "react";

const ListItem = ({ item, index }) => {
  const randomHeader = "Random Header";

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{padding: 10, borderRadius: 6, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)', background: 'white', margin: '0, 0, 8, 0', display: 'grid', gridGap: 20, flexDirection: 'column'}}>
            <span>Content</span>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>{item.content}</span>
              <div style={{display: 'flex', alignItems: 'center'}}>
                {item.id}
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
