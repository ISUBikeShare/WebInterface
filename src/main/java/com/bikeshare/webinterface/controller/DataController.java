package com.bikeshare.webinterface.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.bikeshare.webinterface.service.AddService;
import com.bikeshare.webinterface.service.ViewService;

@Controller
@RequestMapping(value = "/data")
public class DataController {
	
	@RequestMapping(value = "/addtransaction", method = RequestMethod.GET)
	public String addtransaction(Model model){
		AddService service = new AddService();
		/*TODO add param code*/
		return service.addTransaction();
	}
	
	@RequestMapping(value = "/viewbytransactionid", method = RequestMethod.GET)
	public String viewByTransactionId(Model model){
		ViewService service = new ViewService();
		/*TODO add param code*/
		return service.viewByTransactionId();
	}
	
	
	@RequestMapping(value = "/viewbystudentid", method = RequestMethod.GET)
	public String viewByStudentId(Model model){
		ViewService service = new ViewService();
		/*TODO add param code*/
		return service.viewByStudentId();
	}
	
	@RequestMapping(value = "/viewbybikeid", method = RequestMethod.GET)
	public String viewByBikeId(Model model){
		ViewService service = new ViewService();
		/*TODO add param code*/
		return service.viewByBikeId();
	}
	
	@RequestMapping(value = "/viewbystationid", method = RequestMethod.GET)
	public String viewByStationId(Model model){
		ViewService service = new ViewService();
		/*TODO add param code*/
		return service.viewByStationId();
	}
	
	@RequestMapping(value = "/viewallcheckedoutbikes", method = RequestMethod.GET)
	public String viewAllCheckedOutBikes(Model model){
		ViewService service = new ViewService();
		/*TODO add param code*/
		return service.viewAllCheckedOutBikes();
	}
	
	/*TODO 
	 * Fill out param information
	 * change add GETS to POSTS
	 * add additional functions as necessary
	 * */
}
