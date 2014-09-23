package com.iastate.bikeshare.webinterface.db;

import org.junit.Test;

import com.bikeshare.webinterface.service.UtilService;

public class ConnectionTest {

	
	@Test
	public void testCreateTable()
	{
		UtilService service = new UtilService();
		service.createTables();
	}
	
}
