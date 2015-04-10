create or replace package auto_spa_package as
  procedure update_vehicle( vehicle in varchar2 );  
end auto_spa_package;

/

create or replace package body auto_spa_package as
  
  procedure update_vehicle( vehicle in varchar2 )
  is
    l_obj json;
    l_tempdata json_value;
    l_general json;
    l_engine_transmission json;
    l_dimension_capacity json;
    l_exterior json;
    l_interior json;
    l_safety_features json;
    l_product json;
    l_vehicle_id number;
  begin
    l_obj := json(vehicle);

    l_tempdata := l_obj.get('general');
    l_general := json(l_tempdata);
    l_vehicle_id := json_ext.get_number(l_general, 'vehicle_id');
    update vehicles set vin = json_ext.get_string(l_general, 'vin'), 
                        manufacturer = json_ext.get_string(l_general, 'manufacturer'), 
                        model = json_ext.get_string(l_general, 'model'), 
                        model_year = json_ext.get_number(l_general, 'model_year'), 
                        country_manufacturer = json_ext.get_string(l_general, 'country_manufacturer'), 
                        sequential_number = json_ext.get_string(l_general, 'sequential_number'), 
                        body_style = json_ext.get_string(l_general, 'body_style'), 
                        seating = json_ext.get_number(l_general, 'seating'), 
                        doors = json_ext.get_number(l_general, 'doors'), 
                        color = json_ext.get_string(l_general, 'color')
    where vehicle_id = l_vehicle_id;
    
    l_tempdata := l_obj.get('engine_transmission');
    l_engine_transmission := json(l_tempdata);
    update engine_transmission_info set standard_engine = json_ext.get_string(l_engine_transmission, 'standard_engine'), 
                                        horsepower = json_ext.get_number(l_engine_transmission, 'horsepower'),
                                        torgue = json_ext.get_number(l_engine_transmission, 'torgue'),
                                        max_engine_speed = json_ext.get_number(l_engine_transmission, 'max_engine_speed'),
                                        transmission = json_ext.get_string(l_engine_transmission, 'transmission'),
                                        drivetrain = json_ext.get_string(l_engine_transmission, 'drivetrain'),
                                        gas_mileage = json_ext.get_string(l_engine_transmission, 'gas_mileage'),
                                        compression_ratio = json_ext.get_string(l_engine_transmission, 'compression_ratio'),
                                        fuel_type = json_ext.get_string(l_engine_transmission, 'fuel_type'),
                                        total_number_valves = json_ext.get_number(l_engine_transmission, 'total_number_valves'),
                                        bore_x_stroke = json_ext.get_string(l_engine_transmission, 'bore_x_stroke')
    where vehicle_id = l_vehicle_id;
    
    l_tempdata := l_obj.get('dimension_capacity');
    l_dimension_capacity := json(l_tempdata);
    update dimensions_capacity_info set truck_bed_volume = json_ext.get_string(l_dimension_capacity, 'truck_bed_volume'), 
                                         fuel_capacity = json_ext.get_number(l_dimension_capacity, 'fuel_capacity'), 
                                         overall_length = json_ext.get_number(l_dimension_capacity, 'overall_length'), 
                                         width = json_ext.get_number(l_dimension_capacity, 'width'), 
                                         height = json_ext.get_number(l_dimension_capacity, 'height'), 
                                         curb_weight = json_ext.get_number(l_dimension_capacity, 'curb_weight'), 
                                         tires_wheel_size = json_ext.get_string(l_dimension_capacity, 'tires_wheel_size'), 
                                         rear_tires_wheel_size = json_ext.get_string(l_dimension_capacity, 'rear_tires_wheel_size'), 
                                         wheel_base = json_ext.get_number(l_dimension_capacity, 'wheel_base'), 
                                         spare_tire = json_ext.get_string(l_dimension_capacity, 'spare_tire'), 
                                         wheel_type = json_ext.get_string(l_dimension_capacity, 'wheel_type'), 
                                         turning_radius = json_ext.get_string(l_dimension_capacity, 'turning_radius'), 
                                         axle_ratio = json_ext.get_string(l_dimension_capacity, 'axle_ratio'), 
                                         ground_clearance = json_ext.get_number(l_dimension_capacity, 'ground_clearance'), 
                                         gvwr = json_ext.get_string(l_dimension_capacity, 'gvwr'), 
                                         maximum_towing = json_ext.get_string(l_dimension_capacity, 'maximum_towing'), 
                                         payload_base_capacity = json_ext.get_string(l_dimension_capacity, 'payload_base_capacity') 
    where vehicle_id = l_vehicle_id;
    
    l_tempdata := l_obj.get('exterior');
    l_exterior := json(l_tempdata);
    update exterior_info set w2_antilock_brakes = json_ext.get_string(l_exterior, 'w2_antilock_brakes'), 
                             w4_antilock_brakes = json_ext.get_string(l_exterior, 'w4_antilock_brakes'), 
                             brakes_front = json_ext.get_string(l_exterior, 'brakes_front'), 
                             brakes_rear = json_ext.get_string(l_exterior, 'brakes_rear'), 
                             luggage_rack = json_ext.get_string(l_exterior, 'luggage_rack'), 
                             upgraded_wheels = json_ext.get_string(l_exterior, 'upgraded_wheels') 
    where vehicle_id = l_vehicle_id;
    
    l_tempdata := l_obj.get('interior');
    l_interior := json(l_tempdata);
    update interior_info set front_air_conditioning = json_ext.get_string(l_interior, 'front_air_conditioning'), 
                             front_rear_air_conditioning = json_ext.get_string(l_interior, 'front_rear_air_conditioning'), 
                             cruise_control = json_ext.get_string(l_interior, 'cruise_control'), 
                             am_fm_radio = json_ext.get_string(l_interior, 'am_fm_radio'), 
                             cassette = json_ext.get_string(l_interior, 'cassette'), 
                             compact_disc = json_ext.get_string(l_interior, 'compact_disc'), 
                             cd_changer = json_ext.get_string(l_interior, 'cd_changer'), 
                             premium_radio = json_ext.get_string(l_interior, 'premium_radio'), 
                             dvd_entertainment_system = json_ext.get_string(l_interior, 'dvd_entertainment_system'), 
                             cup_holder = json_ext.get_string(l_interior, 'cup_holder'), 
                             leather = json_ext.get_string(l_interior, 'leather'), 
                             navigation_system = json_ext.get_string(l_interior, 'navigation_system'), 
                             privacy_glass = json_ext.get_string(l_interior, 'privacy_glass'), 
                             hands_free_phone = json_ext.get_string(l_interior, 'hands_free_phone'), 
                             power_locks = json_ext.get_string(l_interior, 'power_locks'), 
                             power_outlets = json_ext.get_string(l_interior, 'power_outlets'), 
                             power_mirrors = json_ext.get_string(l_interior, 'power_mirrors'), 
                             remote_mirrors = json_ext.get_string(l_interior, 'remote_mirrors'), 
                             power_seats = json_ext.get_string(l_interior, 'power_seats'), 
                             dual_power_seats = json_ext.get_string(l_interior, 'dual_power_seats'), 
                             folding_rear_seat = json_ext.get_string(l_interior, 'folding_rear_seat'), 
                             moon_roof = json_ext.get_string(l_interior, 'moon_roof'), 
                             sun_roof = json_ext.get_string(l_interior, 'sun_roof'), 
                             remote_keyless_entry = json_ext.get_string(l_interior, 'remote_keyless_entry'), 
                             rear_window_defroster = json_ext.get_string(l_interior, 'rear_window_defroster'), 
                             tilt_wheel = json_ext.get_string(l_interior, 'tilt_wheel'), 
                             tachometer = json_ext.get_string(l_interior, 'tachometer'), 
                             traction_control = json_ext.get_string(l_interior, 'traction_control'), 
                             power_windows = json_ext.get_string(l_interior, 'power_windows') 
    where vehicle_id = l_vehicle_id;
    
    l_tempdata := l_obj.get('safety_features');
    l_safety_features := json(l_tempdata);
    update safety_features_info set airbags = json_ext.get_string(l_safety_features, 'airbags'), 
                                    child_door_locks = json_ext.get_string(l_safety_features, 'child_door_locks'), 
                                    child_seat_anchors = json_ext.get_string(l_safety_features, 'child_seat_anchors'), 
                                    integrated_child_seat = json_ext.get_string(l_safety_features, 'integrated_child_seat'), 
                                    alarm_system = json_ext.get_string(l_safety_features, 'alarm_system'), 
                                    engine_immobilizer = json_ext.get_string(l_safety_features, 'engine_immobilizer') 
    where vehicle_id = l_vehicle_id;
    
    l_tempdata := l_obj.get('product');
    l_product := json(l_tempdata);
    update goods set price = json_ext.get_number(l_product, 'price'), 
                     in_stock = json_ext.get_number(l_product, 'in_stock'), 
--                     delivery_date = json_ext.get_string(l_product, 'delivery_date'), 
--                     future_delivery_date = json_ext.get_string(l_product, 'future_delivery_date'), 
                     is_sold = json_ext.get_number(l_product, 'is_sold'), 
                     client_id = json_ext.get_number(l_product, 'client_id') 
    where product_id = json_ext.get_number(l_product, 'product_id');
    
    commit;
    
  end update_vehicle;

end auto_spa_package;

/