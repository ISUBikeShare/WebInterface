package com.bikeshare.webinterface.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping(value = "/view")
public class ViewController {
	
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(Model model){
		return "index.jsp";
	}
}
