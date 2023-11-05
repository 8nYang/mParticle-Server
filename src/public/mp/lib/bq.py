from google.cloud import bigquery
import json
import sys

def BigQuery(flight_no, departure_date):
    try:
        credentials = service_account.Credentials.from_service_account_file('/Users/hsyang/Downloads/ops-8075-786c932b87e0.json')
        client = bigquery.Client(credentials=credentials,project='ops-8075')
        query=('SELECT customerid, mpid, outbound_flight, outbound_departure_date, inbound_flight, inbound_departure_date FROM ops-8075.Views.view_departure WHERE (outbound_flight LIKE \'' + flight_no + '%\' AND outbound_departure_date LIKE \'' + departure_date + '%\') OR (inbound_flight LIKE ' +  '\'' + flight_no + '%\' AND inbound_departure_date LIKE \'' + departure_date + '%\')')
        query_job = client.query(query)
        results = query_job.result()
        #print(results.values())
        qry_results = []
        for row in results:
            row_result = {}
            row_result['customerid'] = row.get('customerid')
            row_result['mpid'] = row.get('mpid')
            row_result['outbound_flight'] = row.get('outbound_flight')
            row_result['outbound_departure_date'] = row.get('outbound_departure_date')
            row_result['inbound_flight'] = row.get('inbound_flight')
            row_result['inbound_departure_date'] = row.get('inbound_departure_date')
            qry_results.append(row_result)
            #print(row.values())
            #print(row.get('outbound_flight'))
        return qry_results
    except Exception as error:
        print("Error!" + error)