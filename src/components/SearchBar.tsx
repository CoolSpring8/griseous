import { SearchIcon } from "@heroicons/react/solid";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import { useHistory } from "react-router-dom";

function SearchBar(): JSX.Element {
  const history = useHistory();

  return (
    <Formik
      initialValues={{ keyword: "" }}
      onSubmit={(values) => {
        history.push(`/search?q=${values.keyword}`);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex-1 flex space-x-1">
          <Field
            type="keyword"
            name="keyword"
            className="h-8 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          />
          <button type="submit" disabled={isSubmitting}>
            <SearchIcon className="w-5 h-5" />
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default SearchBar;
