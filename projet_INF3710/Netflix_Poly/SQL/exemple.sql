create user netflixiuser1 encrypted password 'netflixi123';
grant all privileges on database netflixidb to netflixiuser1;
grant all privileges on all tables in schema public to netflixiuser1;





create table users (
	id SERIAL PRIMARY KEY,
	name character varying,
	email character varying,
	password character varying,
	addressNumber character varying,
	adressStreet character varying,
	adressCity character varying,
	postalCode character varying
);

Insert into users values (
	default,
	'name',
	'email',
	'password',
	'addressNumber',
	'adressStreet',
	'adressCity',
	'postalCode'
);




create table subscriptions (
	id SERIAL PRIMARY KEY,
	userId INTEGER REFERENCES users(id),
	subscriptionType character varying,
	startDate date,
	endDate date,
	monthlyPrice decimal,
	Film_PayPerView integer
);

