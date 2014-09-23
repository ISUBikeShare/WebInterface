package com.bikeshare.webinterface.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class UtilService {

	public String createTables()
	{
		
		String dbUrl = "jdbc:mysql://vwh-stu-db01d.its.iastate.edu/";
		String dbClass = "com.mysql.jdbc.Driver";
		String userName = "gsb_bikeshare";
		String password = "hJNsCSAmPHW4zih";
		String query = "CREATE TABLE Test(id int)";
		try {
			Class.forName(dbClass);
			Connection connection = DriverManager.getConnection(dbUrl, userName, password);
			Statement statement = connection.createStatement();
			statement.execute(query);	
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		/*TODO add DB code*/
		return "";
	}
	
	public String DestroyTables()
	{
		/*TODO add DB code*/
		return "";
	}
	
}
