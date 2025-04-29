-- Users table (basic compatible syntax)
create table users (
   id       integer primary key,
   name     varchar(255) not null,
   email    varchar(255) not null unique,
   password varchar(255) not null,
   rating   decimal(3,2) default 0
);

-- Items table
create table items (
   id              integer primary key,
   title           varchar(255) not null,
   description     text,
   image           varchar(255),
   available_until date,
   owner_id        integer not null,
   foreign key ( owner_id )
      references users ( id )
);

-- BorrowRequests table
create table borrow_requests (
   id           integer primary key,
   item_id      integer not null,
   requester_id integer not null,
   status       varchar(20) default 'Pending',
   from_date    date not null,
   to_date      date not null,
   rating       integer,
   foreign key ( item_id )
      references items ( id ),
   foreign key ( requester_id )
      references users ( id )
);