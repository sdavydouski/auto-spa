create or replace package auto_spa_package as
  procedure update_vehicle( vehicle in varchar2 );
  procedure insert_vehicles_from_csv( goods_csv_file_name in varchar2, 
                                      vehicles_csv_file_name in varchar2, 
                                      engine_trans_csv_file_name in varchar2, 
                                      dimensions_cap_csv_file_name in varchar2, 
                                      exterior_csv_file_name in varchar2, 
                                      interior_csv_file_name in varchar2, 
                                      safety_features_csv_file_name in varchar2 );
  procedure delete_vehicle( id in number );
  procedure insert_client( client in varchar2, generated_client_id out number );
  procedure update_client( client in varchar2 );
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
  
  
  --TODO: correctly handle empty values
  procedure insert_vehicles_from_csv( goods_csv_file_name in varchar2, 
                                      vehicles_csv_file_name in varchar2, 
                                      engine_trans_csv_file_name in varchar2, 
                                      dimensions_cap_csv_file_name in varchar2, 
                                      exterior_csv_file_name in varchar2, 
                                      interior_csv_file_name in varchar2, 
                                      safety_features_csv_file_name in varchar2 )
  is
    l_file utl_file.file_type;
    l_line VARCHAR2 (4000);
    l_goods_table_row goods%rowtype;
    l_vehicles_table_row vehicles%rowtype;
    l_engine_trans_table_row engine_transmission_info%rowtype;
    l_dimensions_cap_table_row dimensions_capacity_info%rowtype;
    l_exterior_table_row exterior_info%rowtype;
    l_interior_table_row interior_info%rowtype;
    l_safety_features_table_row safety_features_info%rowtype;
    l_regexp varchar2(100) := '[^,]+';
  begin
  
    --Goods
    
    l_file := utl_file.fopen ('ASSETS', goods_csv_file_name, 'r');
    if utl_file.is_open(l_file) then
      loop
        begin
        utl_file.get_line(l_file, l_line, 4000);
        if l_line is null then
          exit;
        end if;
        l_goods_table_row.price := regexp_substr(l_line, l_regexp, 1, 1);
        l_goods_table_row.in_stock := regexp_substr(l_line, l_regexp, 1, 2); 
        l_goods_table_row.delivery_date := to_date( regexp_substr(l_line, l_regexp, 1, 3) );
        l_goods_table_row.is_sold := regexp_substr(l_line, l_regexp, 1, 4);
        l_goods_table_row.client_id := regexp_substr(l_line, l_regexp, 1, 5);
        
        insert into goods (price, in_stock, delivery_date, is_sold, client_id) values (l_goods_table_row.price, 
          l_goods_table_row.in_stock, l_goods_table_row.delivery_date, l_goods_table_row.is_sold, 
          l_goods_table_row.client_id);
        exception
          when no_data_found then
            exit;
        end;
      end loop;
      
    end if;
    
    utl_file.fclose(l_file);
    
    --Vehicles
    
    l_file := utl_file.fopen ('ASSETS', vehicles_csv_file_name, 'r');
    if utl_file.is_open(l_file) then
      loop
        begin
        utl_file.get_line(l_file, l_line, 4000);
        if l_line is null then
          exit;
        end if;
        l_vehicles_table_row.vin := regexp_substr(l_line, l_regexp, 1, 1);
        l_vehicles_table_row.manufacturer := regexp_substr(l_line, l_regexp, 1, 2);
        l_vehicles_table_row.model := regexp_substr(l_line, l_regexp, 1, 3);
        l_vehicles_table_row.model_year := regexp_substr(l_line, l_regexp, 1, 4);
        l_vehicles_table_row.country_manufacturer := regexp_substr(l_line, l_regexp, 1, 5);
        l_vehicles_table_row.sequential_number := regexp_substr(l_line, l_regexp, 1, 6);
        l_vehicles_table_row.body_style := regexp_substr(l_line, l_regexp, 1, 7);
        l_vehicles_table_row.seating := regexp_substr(l_line, l_regexp, 1, 8);
        l_vehicles_table_row.doors := regexp_substr(l_line, l_regexp, 1, 9);
        l_vehicles_table_row.color := regexp_substr(l_line, l_regexp, 1, 10);
        
        l_vehicles_table_row.product_id_fk := regexp_substr(l_line, l_regexp, 1, 11);
        
        insert into vehicles (vin, manufacturer, model, model_year, country_manufacturer, sequential_number, body_style, 
          seating, doors, color, product_id_fk) values (l_vehicles_table_row.vin, l_vehicles_table_row.manufacturer, 
          l_vehicles_table_row.model, l_vehicles_table_row.model_year, l_vehicles_table_row.country_manufacturer, 
          l_vehicles_table_row.sequential_number, l_vehicles_table_row.body_style, l_vehicles_table_row.seating, 
          l_vehicles_table_row.doors, l_vehicles_table_row.color, l_vehicles_table_row.product_id_fk);
        exception
          when no_data_found then
            exit;
        end;
      end loop;
      
    end if;
    
    utl_file.fclose(l_file);
    
    commit;
    
    --Engine & Transmission
    
    l_file := utl_file.fopen ('ASSETS', engine_trans_csv_file_name, 'r');
    if utl_file.is_open(l_file) then
      loop
        declare
          l_temp varchar2(4000);
        begin
        utl_file.get_line(l_file, l_line, 4000);
        if l_line is null then
          exit;
        end if;
        l_engine_trans_table_row.vehicle_id := regexp_substr(l_line, l_regexp, 1, 1);
        l_engine_trans_table_row.standard_engine := regexp_substr(l_line, l_regexp, 1, 2);
        l_engine_trans_table_row.horsepower := regexp_substr(l_line, l_regexp, 1, 3);
        l_engine_trans_table_row.torgue := regexp_substr(l_line, l_regexp, 1, 4);
        l_engine_trans_table_row.max_engine_speed := regexp_substr(l_line, l_regexp, 1, 5);
        l_engine_trans_table_row.transmission := regexp_substr(l_line, l_regexp, 1, 6);
        l_engine_trans_table_row.drivetrain := regexp_substr(l_line, l_regexp, 1, 7);
        l_engine_trans_table_row.gas_mileage := regexp_substr(l_line, l_regexp, 1, 8);
        l_engine_trans_table_row.compression_ratio := regexp_substr(l_line, l_regexp, 1, 9);
        l_engine_trans_table_row.fuel_type := regexp_substr(l_line, l_regexp, 1, 10);
        l_engine_trans_table_row.total_number_valves := regexp_substr(l_line, l_regexp, 1, 11);
        l_engine_trans_table_row.bore_x_stroke := regexp_substr(l_line, l_regexp, 1, 12);
        
        insert into engine_transmission_info (vehicle_id, standard_engine, horsepower, torgue, max_engine_speed, 
          transmission, drivetrain, gas_mileage, compression_ratio, fuel_type, total_number_valves, 
          bore_x_stroke) values (l_engine_trans_table_row.vehicle_id, l_engine_trans_table_row.standard_engine, l_engine_trans_table_row.horsepower,
          l_engine_trans_table_row.torgue, l_engine_trans_table_row.max_engine_speed, l_engine_trans_table_row.transmission, 
          l_engine_trans_table_row.drivetrain, l_engine_trans_table_row.gas_mileage, l_engine_trans_table_row.compression_ratio, 
          l_engine_trans_table_row.fuel_type, l_engine_trans_table_row.total_number_valves, l_engine_trans_table_row.bore_x_stroke);
        exception
          when no_data_found then
            exit;
        end;
      end loop;
      
    end if;
    
    utl_file.fclose(l_file);
    
     --Dimensions & Capacity
    
    l_file := utl_file.fopen ('ASSETS', dimensions_cap_csv_file_name, 'r');
    if utl_file.is_open(l_file) then
      loop
        begin
        utl_file.get_line(l_file, l_line, 4000);
        if l_line is null then
          exit;
        end if;
        l_dimensions_cap_table_row.vehicle_id := regexp_substr(l_line, l_regexp, 1, 1);
        l_dimensions_cap_table_row.truck_bed_volume := regexp_substr(l_line, l_regexp, 1, 2);
        l_dimensions_cap_table_row.fuel_capacity := regexp_substr(l_line, l_regexp, 1, 3); 
        l_dimensions_cap_table_row.overall_length := regexp_substr(l_line, l_regexp, 1, 4);
        l_dimensions_cap_table_row.width := regexp_substr(l_line, l_regexp, 1, 5);
        l_dimensions_cap_table_row.height := regexp_substr(l_line, l_regexp, 1, 6);
        l_dimensions_cap_table_row.curb_weight := regexp_substr(l_line, l_regexp, 1, 7);
        l_dimensions_cap_table_row.tires_wheel_size := regexp_substr(l_line, l_regexp, 1, 8);
        l_dimensions_cap_table_row.rear_tires_wheel_size := regexp_substr(l_line, l_regexp, 1, 9);
        l_dimensions_cap_table_row.wheel_base := regexp_substr(l_line, l_regexp, 1, 10);
        l_dimensions_cap_table_row.spare_tire := regexp_substr(l_line, l_regexp, 1, 11);
        l_dimensions_cap_table_row.wheel_type := regexp_substr(l_line, l_regexp, 1, 12);
        l_dimensions_cap_table_row.turning_radius := regexp_substr(l_line, l_regexp, 1, 13);
        l_dimensions_cap_table_row.axle_ratio := regexp_substr(l_line, l_regexp, 1, 14);
        l_dimensions_cap_table_row.ground_clearance := regexp_substr(l_line, l_regexp, 1, 15);
        l_dimensions_cap_table_row.gvwr := regexp_substr(l_line, l_regexp, 1, 16);
        l_dimensions_cap_table_row.maximum_towing := regexp_substr(l_line, l_regexp, 1, 17);
        l_dimensions_cap_table_row.payload_base_capacity := regexp_substr(l_line, l_regexp, 1, 18);
        
        insert into dimensions_capacity_info (vehicle_id, truck_bed_volume, fuel_capacity, overall_length, width, height, 
          curb_weight, tires_wheel_size, rear_tires_wheel_size, wheel_base, spare_tire, wheel_type, turning_radius, 
          axle_ratio, ground_clearance, gvwr, maximum_towing, payload_base_capacity) values (l_dimensions_cap_table_row. vehicle_id,
          l_dimensions_cap_table_row.truck_bed_volume, l_dimensions_cap_table_row.fuel_capacity, l_dimensions_cap_table_row.overall_length, l_dimensions_cap_table_row.width, 
          l_dimensions_cap_table_row.height, l_dimensions_cap_table_row.curb_weight, l_dimensions_cap_table_row.tires_wheel_size, 
          l_dimensions_cap_table_row.rear_tires_wheel_size, l_dimensions_cap_table_row.wheel_base, l_dimensions_cap_table_row.spare_tire, 
          l_dimensions_cap_table_row.wheel_type, l_dimensions_cap_table_row.turning_radius, l_dimensions_cap_table_row.axle_ratio, 
          l_dimensions_cap_table_row.ground_clearance, l_dimensions_cap_table_row.gvwr, l_dimensions_cap_table_row.maximum_towing, 
          l_dimensions_cap_table_row.payload_base_capacity);
        exception
          when no_data_found then
            exit;
        end;
      end loop;
      
    end if;
    
    utl_file.fclose(l_file);
    
    --Exterior
    
    l_file := utl_file.fopen ('ASSETS', exterior_csv_file_name, 'r');
    if utl_file.is_open(l_file) then
      loop
        begin
        utl_file.get_line(l_file, l_line, 4000);
        if l_line is null then
          exit;
        end if;
        l_exterior_table_row.vehicle_id := regexp_substr(l_line, l_regexp, 1, 1);
        l_exterior_table_row.w2_antilock_brakes := regexp_substr(l_line, l_regexp, 1, 2);
        l_exterior_table_row.w4_antilock_brakes := regexp_substr(l_line, l_regexp, 1, 3); 
        l_exterior_table_row.brakes_front := regexp_substr(l_line, l_regexp, 1, 4);
        l_exterior_table_row.brakes_rear := regexp_substr(l_line, l_regexp, 1, 5);
        l_exterior_table_row.luggage_rack := regexp_substr(l_line, l_regexp, 1, 6);
        l_exterior_table_row.upgraded_wheels := regexp_substr(l_line, l_regexp, 1, 7);
        
        insert into exterior_info (vehicle_id, w2_antilock_brakes, w4_antilock_brakes, brakes_front, brakes_rear, 
          luggage_rack, upgraded_wheels) values (l_exterior_table_row.vehicle_id, l_exterior_table_row.w2_antilock_brakes,
          l_exterior_table_row.w4_antilock_brakes, l_exterior_table_row.brakes_front, l_exterior_table_row.brakes_rear, 
          l_exterior_table_row.luggage_rack, l_exterior_table_row.upgraded_wheels);
        exception
          when no_data_found then
            exit;
        end;
      end loop;
      
    end if;
    
    utl_file.fclose(l_file);
    
     --Interior
    
    l_file := utl_file.fopen ('ASSETS', interior_csv_file_name, 'r');
    if utl_file.is_open(l_file) then
      loop
        begin
        utl_file.get_line(l_file, l_line, 4000);
        if l_line is null then
          exit;
        end if;
        l_interior_table_row.vehicle_id := regexp_substr(l_line, l_regexp, 1, 1);
        l_interior_table_row.front_air_conditioning := regexp_substr(l_line, l_regexp, 1, 2);
        l_interior_table_row.front_rear_air_conditioning := regexp_substr(l_line, l_regexp, 1, 3); 
        l_interior_table_row.cruise_control := regexp_substr(l_line, l_regexp, 1, 4);
        l_interior_table_row.am_fm_radio := regexp_substr(l_line, l_regexp, 1, 5);
        l_interior_table_row.cassette := regexp_substr(l_line, l_regexp, 1, 6);
        l_interior_table_row.compact_disc := regexp_substr(l_line, l_regexp, 1, 7);
        l_interior_table_row.cd_changer := regexp_substr(l_line, l_regexp, 1, 8);
        l_interior_table_row.premium_radio := regexp_substr(l_line, l_regexp, 1, 9);
        l_interior_table_row.dvd_entertainment_system := regexp_substr(l_line, l_regexp, 1, 10);
        l_interior_table_row.cup_holder := regexp_substr(l_line, l_regexp, 1, 11);
        l_interior_table_row.leather := regexp_substr(l_line, l_regexp, 1, 12);
        l_interior_table_row.navigation_system := regexp_substr(l_line, l_regexp, 1, 13);
        l_interior_table_row.privacy_glass := regexp_substr(l_line, l_regexp, 1, 14);
        l_interior_table_row.hands_free_phone := regexp_substr(l_line, l_regexp, 1, 15);
        l_interior_table_row.power_locks := regexp_substr(l_line, l_regexp, 1, 16);
        l_interior_table_row.power_outlets := regexp_substr(l_line, l_regexp, 1, 17);
        l_interior_table_row.power_mirrors := regexp_substr(l_line, l_regexp, 1, 18);
        l_interior_table_row.remote_mirrors := regexp_substr(l_line, l_regexp, 1, 19);
        l_interior_table_row.power_seats := regexp_substr(l_line, l_regexp, 1, 20);
        l_interior_table_row.dual_power_seats := regexp_substr(l_line, l_regexp, 1, 21);
        l_interior_table_row.folding_rear_seat := regexp_substr(l_line, l_regexp, 1, 22);
        l_interior_table_row.moon_roof := regexp_substr(l_line, l_regexp, 1, 23);
        l_interior_table_row.sun_roof := regexp_substr(l_line, l_regexp, 1, 24);
        l_interior_table_row.remote_keyless_entry := regexp_substr(l_line, l_regexp, 1, 25);
        l_interior_table_row.rear_window_defroster := regexp_substr(l_line, l_regexp, 1, 26);
        l_interior_table_row.tilt_wheel := regexp_substr(l_line, l_regexp, 1, 27);
        l_interior_table_row.tachometer := regexp_substr(l_line, l_regexp, 1, 28);
        l_interior_table_row.traction_control := regexp_substr(l_line, l_regexp, 1, 29);
        l_interior_table_row.power_windows := regexp_substr(l_line, l_regexp, 1, 30);
        
        insert into interior_info (vehicle_id, front_air_conditioning, front_rear_air_conditioning, cruise_control, am_fm_radio, 
          cassette, compact_disc, cd_changer, premium_radio, dvd_entertainment_system, cup_holder, leather, 
          navigation_system, privacy_glass, hands_free_phone, power_locks, power_outlets, power_mirrors, remote_mirrors, power_seats, 
          dual_power_seats, folding_rear_seat, moon_roof, sun_roof, remote_keyless_entry, rear_window_defroster, 
          tilt_wheel, tachometer, traction_control, power_windows) values (l_interior_table_row.vehicle_id, l_interior_table_row.front_air_conditioning, 
          l_interior_table_row.front_rear_air_conditioning, l_interior_table_row.cruise_control, l_interior_table_row.am_fm_radio, 
          l_interior_table_row.cassette, l_interior_table_row.compact_disc, l_interior_table_row.cd_changer, l_interior_table_row.premium_radio, 
          l_interior_table_row.dvd_entertainment_system, l_interior_table_row.cup_holder, l_interior_table_row.leather, 
          l_interior_table_row.navigation_system, l_interior_table_row.privacy_glass, l_interior_table_row.hands_free_phone, 
          l_interior_table_row.power_locks, l_interior_table_row.power_outlets, l_interior_table_row.power_mirrors, 
          l_interior_table_row.remote_mirrors, l_interior_table_row.power_seats, l_interior_table_row.dual_power_seats, 
          l_interior_table_row.folding_rear_seat, l_interior_table_row.moon_roof, l_interior_table_row.sun_roof, 
          l_interior_table_row.remote_keyless_entry, l_interior_table_row.rear_window_defroster, l_interior_table_row.tilt_wheel, 
          l_interior_table_row.tachometer, l_interior_table_row.traction_control, l_interior_table_row.power_windows);
        exception
          when no_data_found then
            exit;
        end;
      end loop;
      
    end if;
    
    utl_file.fclose(l_file);
    
     --Safety Features
    
    l_file := utl_file.fopen ('ASSETS', safety_features_csv_file_name, 'r');
    if utl_file.is_open(l_file) then
      loop
        begin
        utl_file.get_line(l_file, l_line, 4000);
        if l_line is null then
          exit;
        end if;
        l_safety_features_table_row.vehicle_id := regexp_substr(l_line, l_regexp, 1, 1);
        l_safety_features_table_row.airbags := regexp_substr(l_line, l_regexp, 1, 2);
        l_safety_features_table_row.child_door_locks := regexp_substr(l_line, l_regexp, 1, 3); 
        l_safety_features_table_row.child_seat_anchors := regexp_substr(l_line, l_regexp, 1, 4);
        l_safety_features_table_row.integrated_child_seat := regexp_substr(l_line, l_regexp, 1, 5);
        l_safety_features_table_row.alarm_system := regexp_substr(l_line, l_regexp, 1, 6);
        l_safety_features_table_row.engine_immobilizer := regexp_substr(l_line, l_regexp, 1, 7);
        
        insert into safety_features_info (vehicle_id, airbags, child_door_locks, child_seat_anchors, integrated_child_seat, 
          alarm_system, engine_immobilizer) values (l_safety_features_table_row.vehicle_id, 
          l_safety_features_table_row.airbags, l_safety_features_table_row.child_door_locks, 
          l_safety_features_table_row.child_seat_anchors, l_safety_features_table_row.integrated_child_seat, 
          l_safety_features_table_row.alarm_system, l_safety_features_table_row.engine_immobilizer);
        exception
          when no_data_found then
            exit;
        end;
      end loop;
      
    end if;
    
    utl_file.fclose(l_file);
    
    --Finally, over
    commit;
    
  end insert_vehicles_from_csv;
  
  
  procedure delete_vehicle( id in number )
  is
    l_product_id number;
  begin
    select product_id_fk into l_product_id from vehicles where vehicle_id = id;

    delete from safety_features_info where vehicle_id = id;
    delete from interior_info where vehicle_id = id;
    delete from exterior_info where vehicle_id = id;
    delete from dimensions_capacity_info where vehicle_id = id;
    delete from engine_transmission_info where vehicle_id = id;
    
    delete from vehicles where vehicle_id = id;
    delete from goods where product_id = l_product_id;
    
    commit;
  end delete_vehicle;


  procedure insert_client( client in varchar2, generated_client_id out number )
  is
    l_obj json;
  begin
    l_obj := json(client);

    insert into clients (first_name, last_name, phone, delivery, cash, credit, country, city, address, passport, email, skype)
    values ( json_ext.get_string(l_obj, 'first_name'), 
             json_ext.get_string(l_obj, 'last_name'), 
             json_ext.get_string(l_obj, 'phone'), 
             json_ext.get_number(l_obj, 'delivery'), 
             json_ext.get_number(l_obj, 'cash'), 
             json_ext.get_number(l_obj, 'credit'), 
             json_ext.get_string(l_obj, 'country'), 
             json_ext.get_string(l_obj, 'city'), 
             json_ext.get_string(l_obj, 'address'), 
             json_ext.get_string(l_obj, 'passport'), 
             json_ext.get_string(l_obj, 'email'), 
             json_ext.get_string(l_obj, 'skype'))
    returning client_id into generated_client_id;
    
    commit;
    
  end insert_client;


  procedure update_client( client in varchar2 )
  is
    l_obj json;
  begin
    l_obj := json(client);

    update clients set  first_name = json_ext.get_string(l_obj, 'first_name'), 
                        last_name = json_ext.get_string(l_obj, 'last_name'), 
                        phone = json_ext.get_string(l_obj, 'phone'), 
                        delivery = json_ext.get_number(l_obj, 'delivery'), 
                        cash = json_ext.get_number(l_obj, 'cash'), 
                        credit = json_ext.get_number(l_obj, 'credit'), 
                        country = json_ext.get_string(l_obj, 'country'), 
                        city = json_ext.get_string(l_obj, 'city'), 
                        address = json_ext.get_string(l_obj, 'address'), 
                        passport = json_ext.get_string(l_obj, 'passport'), 
                        email = json_ext.get_string(l_obj, 'email'), 
                        skype = json_ext.get_string(l_obj, 'skype') 
    where client_id = json_ext.get_number(l_obj, 'client_id');
    
    commit;
    
  end update_client;



end auto_spa_package;

/