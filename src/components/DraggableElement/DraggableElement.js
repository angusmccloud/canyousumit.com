import { Droppable } from "react-beautiful-dnd";
import { ListItem } from '../index';
import React from "react";

const DraggableElement = ({ prefix, elements }) => (
  <div style={{ padding: 10, borderRadius: 6, background: '#d4d4d4'}}>
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements.map((item, index) => (
            <ListItem key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default DraggableElement;
